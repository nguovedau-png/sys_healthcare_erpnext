import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
    Inject,
    Optional,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientProxy } from '@nestjs/microservices';

const SENSITIVE_KEYS = new Set([
    'password', 'token', 'authorization', 'apikey', 'apisecret', 'secret', 'phone', 'email', 'address',
    'dob', 'dateofbirth', 'nationalid', 'insuranceid', 'patientname', 'patientphone', 'customername',
    'customerphone', 'clinicalnotes', 'diagnosis', 'diagnosiscodes', 'history', 'vitalsigns', 'medicines',
    'prescription', 'result', 'resultdata', 'access_token', 'refresh_token',
]);

function redact(value: unknown, depth = 0): unknown {
    if (depth > 6) return '[TRUNCATED]';
    if (typeof value === 'string') return value.length > 300 ? `${value.slice(0, 300)}...[TRUNCATED]` : value;
    if (Array.isArray(value)) return value.slice(0, 100).map((item) => redact(item, depth + 1));
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).slice(0, 100).map(([key, item]) => {
        const normalizedKey = key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return [key, SENSITIVE_KEYS.has(normalizedKey) ? '[REDACTED]' : redact(item, depth + 1)];
    }));
}

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    private readonly logger = new Logger('AuditInterceptor');

    constructor(
        @Optional() @Inject('LOGGER_SERVICE') private readonly client: ClientProxy,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest();
        if (!request) return next.handle();

        const { method, url, user, body, ip } = request;
        if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) return next.handle();

        const startTime = Date.now();
        return next.handle().pipe(
            tap({
                next: (data) => this.logAction(method, url, user, body, ip, 'SUCCESS', Date.now() - startTime, data),
                error: (error) => this.logAction(method, url, user, body, ip, 'FAILURE', Date.now() - startTime, { error: error?.message || 'Request failed' }),
            }),
        );
    }

    private logAction(
        method: string,
        url: string,
        user: { id?: string | number; roles?: string[] } | undefined,
        body: unknown,
        ip: string,
        status: string,
        duration: number,
        response: unknown,
    ): void {
        const auditLog = {
            userId: user?.id || 'ANONYMOUS',
            roles: user?.roles,
            action: `${method} ${url}`,
            method,
            url,
            payload: redact(body),
            response: redact(response),
            status,
            ip,
            duration,
            timestamp: new Date().toISOString(),
        };

        this.logger.log(`Audit Log: ${auditLog.action} - ${status}`);
        if (this.client) {
            this.client.emit({ cmd: 'log.create' }, {
                level: 'info',
                category: 'AUDIT',
                message: JSON.stringify(auditLog),
            }).subscribe({
                error: (err) => this.logger.error(`Failed to send audit log to LOGGER_SERVICE: ${err.message}`),
            });
        } else {
            this.logger.warn('LOGGER_SERVICE client not found, audit log only printed to console.');
        }
    }
}
