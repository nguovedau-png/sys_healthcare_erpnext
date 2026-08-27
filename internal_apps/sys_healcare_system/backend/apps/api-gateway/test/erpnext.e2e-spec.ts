import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ErpController } from '../src/erp.controller';
import { of } from 'rxjs';
import request = require('supertest');

describe('ERPNext gateway (e2e)', () => {
  let app: INestApplication;
  const send = jest.fn((pattern: { cmd: string }) => {
    if (pattern.cmd === 'erpnext.health') return of({ configured: false, consecutiveFailures: 0 });
    return of({ ok: true });
  });
  const originalToken = process.env.ERPNEXT_SYNC_TOKEN;

  beforeAll(async () => {
    process.env.ERPNEXT_SYNC_TOKEN = 'e2e-sync-token';
    const moduleRef = await Test.createTestingModule({
      controllers: [ErpController],
      providers: [
        { provide: 'ERP_SERVICE', useValue: { send } },
        { provide: JwtService, useValue: { verify: jest.fn() } },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    if (originalToken === undefined) delete process.env.ERPNEXT_SYNC_TOKEN;
    else process.env.ERPNEXT_SYNC_TOKEN = originalToken;
    if (app) await app.close();
  });

  it('exposes sanitized health metadata', async () => {
    await request(app.getHttpServer())
      .get('/erp/integrations/erpnext/health')
      .expect(200)
      .expect({ configured: false, consecutiveFailures: 0 });
  });

  it('rejects unauthenticated upsert writes', async () => {
    await request(app.getHttpServer())
      .post('/erp/integrations/erpnext/upsert')
      .send({ doctype: 'Patient', data: {}, context: {} })
      .expect(401);
  });

  it('accepts an authenticated, validated upsert', async () => {
    await request(app.getHttpServer())
      .post('/erp/integrations/erpnext/upsert')
      .set('x-erpnext-sync-token', 'e2e-sync-token')
      .send({
        doctype: 'Patient',
        data: { patient_name: 'Test Patient' },
        context: {
          tenantId: 'tenant-1',
          facilityId: 'facility-1',
          sourceSystem: 'healthcare-platform',
          sourceId: 'patient-1',
          idempotencyKey: 'patient-1-v1',
        },
      })
      .expect(201)
      .expect({ ok: true });
  });
});
