-- Healthcare ERPNext integration hardening.
-- Apply through the deployment migration runner; statements are intentionally explicit.
ALTER TABLE "SyncOperation" ADD COLUMN IF NOT EXISTS "remoteModifiedAt" TIMESTAMP(3);
ALTER TABLE "SyncOperation" ADD COLUMN IF NOT EXISTS "lastAttemptAt" TIMESTAMP(3);
ALTER TABLE "SyncOperation" ADD COLUMN IF NOT EXISTS "lockedAt" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "ExternalReference" (
  "id" TEXT NOT NULL,
  "tenantId" TEXT NOT NULL,
  "facilityId" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "doctype" TEXT NOT NULL,
  "remoteName" TEXT NOT NULL,
  "remoteModifiedAt" TIMESTAMP(3),
  "versionHash" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ExternalReference_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "ExternalReference_local_key" ON "ExternalReference" ("tenantId", "facilityId", "entityType", "entityId");
CREATE UNIQUE INDEX IF NOT EXISTS "ExternalReference_remote_key" ON "ExternalReference" ("provider", "doctype", "remoteName");
CREATE INDEX IF NOT EXISTS "ExternalReference_scope_idx" ON "ExternalReference" ("tenantId", "facilityId", "entityType");

CREATE TABLE IF NOT EXISTS "WebhookReceipt" (
  "id" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "tenantId" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "signatureVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "status" TEXT NOT NULL DEFAULT 'RECEIVED',
  "payloadHash" TEXT NOT NULL,
  "processedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WebhookReceipt_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "WebhookReceipt_event_key" ON "WebhookReceipt" ("provider", "tenantId", "eventId");
CREATE INDEX IF NOT EXISTS "WebhookReceipt_scope_idx" ON "WebhookReceipt" ("tenantId", "status", "createdAt");

CREATE TABLE IF NOT EXISTS "ConsentRecord" (
  "id" TEXT NOT NULL,
  "tenantId" TEXT NOT NULL,
  "facilityId" TEXT NOT NULL,
  "patientId" TEXT NOT NULL,
  "purpose" TEXT NOT NULL,
  "legalBasis" TEXT NOT NULL,
  "scope" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "policyVersion" TEXT NOT NULL,
  "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "withdrawnAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ConsentRecord_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "ConsentRecord_scope_idx" ON "ConsentRecord" ("tenantId", "facilityId", "patientId", "status");

CREATE TABLE IF NOT EXISTS "AuditEvent" (
  "id" TEXT NOT NULL,
  "tenantId" TEXT NOT NULL,
  "facilityId" TEXT,
  "actorId" TEXT,
  "action" TEXT NOT NULL,
  "resourceType" TEXT NOT NULL,
  "resourceId" TEXT NOT NULL,
  "outcome" TEXT NOT NULL,
  "requestId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "AuditEvent_scope_idx" ON "AuditEvent" ("tenantId", "facilityId", "createdAt");
CREATE INDEX IF NOT EXISTS "AuditEvent_resource_idx" ON "AuditEvent" ("resourceType", "resourceId", "createdAt");
