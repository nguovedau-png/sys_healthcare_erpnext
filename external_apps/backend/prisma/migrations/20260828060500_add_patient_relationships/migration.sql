CREATE TABLE "PatientRelationship" (
  "id" TEXT NOT NULL,
  "tenantId" TEXT NOT NULL,
  "facilityId" TEXT NOT NULL,
  "guardianPatientId" TEXT NOT NULL,
  "dependentPatientId" TEXT NOT NULL,
  "relationship" TEXT NOT NULL,
  "consentStatus" TEXT NOT NULL DEFAULT 'pending',
  "consentCapturedAt" TIMESTAMP(3),
  "revokedAt" TIMESTAMP(3),
  "createdById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PatientRelationship_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "PatientRelationship_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "PatientRelationship_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "PatientRelationship_guardianPatientId_fkey" FOREIGN KEY ("guardianPatientId") REFERENCES "PatientProjection"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "PatientRelationship_dependentPatientId_fkey" FOREIGN KEY ("dependentPatientId") REFERENCES "PatientProjection"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "PatientRelationship_tenantId_facilityId_guardianPatientId_dependentPatientId_key" ON "PatientRelationship"("tenantId", "facilityId", "guardianPatientId", "dependentPatientId");
CREATE INDEX "PatientRelationship_tenantId_facilityId_guardianPatientId_consentStatus_idx" ON "PatientRelationship"("tenantId", "facilityId", "guardianPatientId", "consentStatus");
CREATE INDEX "PatientRelationship_tenantId_facilityId_dependentPatientId_consentStatus_idx" ON "PatientRelationship"("tenantId", "facilityId", "dependentPatientId", "consentStatus");
