-- Enforce the domain invariant that a patient has at most one active consent
-- per facility and purpose. Historical withdrawn versions remain queryable.
CREATE UNIQUE INDEX "ConsentRecord_active_scope_purpose_key"
ON "ConsentRecord" ("tenantId", "facilityId", "patientId", "purpose")
WHERE "status" = 'active' AND "withdrawnAt" IS NULL;
