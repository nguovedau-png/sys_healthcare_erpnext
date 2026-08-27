import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { Prisma } from '@prisma/client-erp-service';
import { PrismaService } from '../prisma';
import { errorSummary, redactForLog } from './erpnext.retry';
import { ErpNextClient } from './erpnext.client';
import {
  ERP_NEXT_DOCTYPES,
  ErpNextClientOptions,
  ErpNextDocument,
  SyncHealthStatus,
  SyncOperationStatus,
  SyncResult,
} from './erpnext.types';

const DEFAULT_DEAD_LETTER_THRESHOLD = 5;

@Injectable()
export class ErpNextIntegrationService implements OnModuleInit {
  private client?: ErpNextClient;
  private deadLetterThreshold = DEFAULT_DEAD_LETTER_THRESHOLD;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    const { ERPNEXT_BASE_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET } = process.env;
    this.deadLetterThreshold = this.parseIntegerEnv('ERPNEXT_DEAD_LETTER_THRESHOLD', DEFAULT_DEAD_LETTER_THRESHOLD, 1, 20);
    if (ERPNEXT_BASE_URL && ERPNEXT_API_KEY && ERPNEXT_API_SECRET) {
      const options: ErpNextClientOptions = {
        baseUrl: ERPNEXT_BASE_URL,
        apiKey: ERPNEXT_API_KEY,
        apiSecret: ERPNEXT_API_SECRET,
        timeoutMs: this.parseIntegerEnv('ERPNEXT_TIMEOUT_MS', 10_000, 100, 120_000),
        maxRetries: this.parseIntegerEnv('ERPNEXT_MAX_RETRIES', 3, 0, 8),
        retryBaseDelayMs: this.parseIntegerEnv('ERPNEXT_RETRY_BASE_DELAY_MS', 250, 0, 10_000),
      };
      this.client = new ErpNextClient(options);
    }
  }

  async upsert(document: ErpNextDocument): Promise<SyncResult> {
    this.validateDocument(document);
    if (!this.client) throw new Error('ERPNext integration is not configured');
    this.validatePayload(document);

    const requestHash = createHash('sha256')
      .update(JSON.stringify({ doctype: document.doctype, name: document.name, data: document.data, context: document.context }))
      .digest('hex');
    const where = {
      tenantId_sourceSystem_sourceId_idempotencyKey: {
        tenantId: document.context.tenantId,
        sourceSystem: document.context.sourceSystem,
        sourceId: document.context.sourceId,
        idempotencyKey: document.context.idempotencyKey,
      },
    };

    let operation = await this.prisma.syncOperation.findUnique({ where });
    if (operation && operation.requestHash !== requestHash) {
      throw new ConflictException('The idempotency key was already used with a different payload');
    }

    if (!operation) {
      try {
        operation = await this.prisma.syncOperation.create({
          data: {
            tenantId: document.context.tenantId,
            facilityId: document.context.facilityId,
            sourceSystem: document.context.sourceSystem,
            sourceId: document.context.sourceId,
            idempotencyKey: document.context.idempotencyKey,
            doctype: document.doctype,
            documentName: document.name,
            requestHash,
            requestSummary: redactForLog({ doctype: document.doctype, hasName: Boolean(document.name), sourceSystem: document.context.sourceSystem }) as Prisma.InputJsonValue,
          },
        });
      } catch (error) {
        if (!this.isUniqueViolation(error)) throw error;
        operation = await this.prisma.syncOperation.findUniqueOrThrow({ where });
        if (operation.requestHash !== requestHash) {
          throw new ConflictException('The idempotency key was already used with a different payload');
        }
      }
    }

    if (operation.status === 'COMPLETED') {
      return {
        operationId: operation.id,
        status: operation.status as SyncOperationStatus,
        replayed: true,
        data: this.asRecord(operation.responseData),
      };
    }

    const claimed = await this.prisma.syncOperation.updateMany({
      where: {
        id: operation.id,
        requestHash,
        status: { in: ['PENDING', 'FAILED', 'DEAD_LETTER'] },
      },
      data: {
        status: 'PROCESSING',
        attemptCount: { increment: 1 },
        nextAttemptAt: null,
        lastError: null,
        lastErrorCode: null,
      },
    });
    if (claimed.count === 0) {
      const current = await this.prisma.syncOperation.findUniqueOrThrow({ where: { id: operation.id } });
      if (current.requestHash !== requestHash) throw new ConflictException('The idempotency key was already used with a different payload');
      return {
        operationId: current.id,
        status: current.status as SyncOperationStatus,
        replayed: true,
        data: this.asRecord(current.responseData),
      };
    }
    const processing = await this.prisma.syncOperation.findUniqueOrThrow({ where: { id: operation.id } });

    try {
      const data = await this.client.upsert(document);
      await this.prisma.syncOperation.update({
        where: { id: operation.id },
        data: {
          status: 'COMPLETED',
          responseData: data as Prisma.InputJsonValue,
          completedAt: new Date(),
        },
      });
      return { operationId: operation.id, status: 'COMPLETED', replayed: false, data };
    } catch (error) {
      const summary = errorSummary(error);
      const status: SyncOperationStatus = processing.attemptCount >= this.deadLetterThreshold ? 'DEAD_LETTER' : 'FAILED';
      await this.prisma.syncOperation.update({
        where: { id: operation.id },
        data: {
          status,
          lastErrorCode: summary.code ?? (summary.status ? `HTTP_${summary.status}` : 'ERP_NEXT_ERROR'),
          lastError: summary.status ? `ERPNext request failed with HTTP ${summary.status}` : 'ERPNext request failed',
          nextAttemptAt: status === 'FAILED' ? new Date(Date.now() + 60_000) : null,
        },
      });
      throw error;
    }
  }

  async listSyncOperations(params: { tenantId: string; facilityId?: string; status?: string; page?: number; limit?: number }) {
    const tenantId = this.requireContextValue(params.tenantId, 'tenantId');
    const page = Math.max(1, Math.floor(params.page || 1));
    const limit = Math.min(100, Math.max(1, Math.floor(params.limit || 20)));
    const where: Prisma.SyncOperationWhereInput = {
      tenantId,
      ...(params.facilityId ? { facilityId: this.requireContextValue(params.facilityId, 'facilityId') } : {}),
      ...(params.status ? { status: this.requireStatus(params.status) } : {}),
    };
    const [data, total] = await Promise.all([
      this.prisma.syncOperation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, tenantId: true, facilityId: true, sourceSystem: true, sourceId: true,
          idempotencyKey: true, doctype: true, documentName: true, status: true, attemptCount: true,
          nextAttemptAt: true, lastErrorCode: true, lastError: true, requestSummary: true,
          createdAt: true, updatedAt: true, completedAt: true,
        },
      }),
      this.prisma.syncOperation.count({ where }),
    ]);
    return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getSyncOperation(id: string, tenantId: string) {
    const operation = await this.prisma.syncOperation.findFirst({
      where: { id, tenantId: this.requireContextValue(tenantId, 'tenantId') },
      select: {
        id: true, tenantId: true, facilityId: true, sourceSystem: true, sourceId: true,
        idempotencyKey: true, doctype: true, documentName: true, status: true, attemptCount: true,
        nextAttemptAt: true, lastErrorCode: true, lastError: true, requestSummary: true,
        createdAt: true, updatedAt: true, completedAt: true,
      },
    });
    if (!operation) throw new NotFoundException('Sync operation not found');
    return operation;
  }

  getHealth(): SyncHealthStatus {
    const health = this.client?.getHealth();
    if (!health) return { configured: false, consecutiveFailures: 0 };
    const { baseUrl: _baseUrl, ...publicHealth } = health;
    return publicHealth;
  }

  private validateDocument(document: ErpNextDocument): void {
    if (!document || !ERP_NEXT_DOCTYPES.includes(document.doctype)) throw new Error('Unsupported ERPNext doctype');
    if (!document.context || document.context.sourceSystem !== 'healthcare-platform') throw new Error('Invalid ERPNext source system');
    for (const [field, value] of Object.entries(document.context)) {
      if (typeof value !== 'string' || value.length === 0 || value.length > 128 || !/^[a-zA-Z0-9._:-]+$/.test(value)) {
        throw new Error(`Invalid ERPNext context field: ${field}`);
      }
    }
    if (document.name !== undefined && (typeof document.name !== 'string' || document.name.length > 140 || !/^[a-zA-Z0-9._:-]+$/.test(document.name))) {
      throw new Error('Invalid ERPNext document name');
    }
  }

  private validatePayload(document: ErpNextDocument): void {
    if (!document.data || typeof document.data !== 'object' || Array.isArray(document.data)) throw new Error('ERPNext document data must be an object');
    const serialized = JSON.stringify(document.data);
    if (serialized.length > 256_000) throw new Error('ERPNext document data exceeds the 256KB limit');
  }

  private requireContextValue(value: unknown, field: string): string {
    if (typeof value !== 'string' || value.length === 0 || value.length > 128 || /[\r\n]/.test(value)) throw new Error(`Invalid ${field}`);
    return value;
  }

  private requireStatus(value: string): string {
    if (!['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'DEAD_LETTER'].includes(value)) throw new Error('Invalid sync operation status');
    return value;
  }

  private parseIntegerEnv(name: string, fallback: number, min: number, max: number): number {
    const raw = process.env[name];
    if (raw === undefined || raw.trim() === '') return fallback;
    const value = Number(raw);
    if (!Number.isInteger(value) || value < min || value > max) throw new Error(`${name} must be an integer between ${min} and ${max}`);
    return value;
  }

  private isUniqueViolation(error: unknown): boolean {
    return Boolean(error && typeof error === 'object' && (error as { code?: string }).code === 'P2002');
  }

  private asRecord(value: Prisma.JsonValue | null): Record<string, unknown> | undefined {
    return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
  }
}
