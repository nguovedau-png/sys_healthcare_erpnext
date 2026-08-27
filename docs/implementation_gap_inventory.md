# Gap inventory

## Prisma models
13:enum RoleType {
19:enum JobType {
27:enum JobStatus {
34:model User {
68:model SocialAccount {
84:model Role {
98:model Permission {
112:model RolePermission {
124:model AuditLog {
142:model Language {
153:model Setting {
166:model Job {
182:model Department {
194:model Employee {
212:model Channel {
228:model ChannelMember {
244:model Message {
261:model MessageRead {
273:model Media {
289:model Webhook {
304:model OidcClientApp {
326:model OidcStorage {
342:model WebhookLog {
357:model Demo {

## Registered API routes
129:app.use('/api/v1/jobs', jobRoutes);
130:app.use('/api/v1/departments', departmentRoutes);
154:        app.use('/api/v1/media', mediaRoutes);
157:        app.use('/api/v1/auth', authRoutes);
158:        app.use('/api/v1/users', userRoutes);
159:        app.use('/api/v1/roles', roleRoutes);
160:        app.use('/api/v1/permissions', permissionRoutes);
161:        app.use('/api/v1/departments', departmentRoutes);
162:        app.use('/api/v1/employees', employeeRoutes);
163:        app.use('/api/v1/audit-logs', auditLogRoutes);
164:        app.use('/api/v1/system', systemRoutes);
165:        app.use('/api/v1/chat', chatRoutes);
166:        app.use('/api/v1/jobs', jobRoutes);
168:        app.use('/api/v1/webhooks', webhookRoutes);
169:        app.use('/api/v1/cache', cacheRoutes);
172:        app.use('/api/v1/oidc', oidcRoutes);

## Healthcare modules
external_apps/backend/src/modules/queue/queue.service.ts
external_apps/backend/src/modules/sync/erpnext-sync.service.ts
external_apps/backend/src/modules/webhook/index.ts
external_apps/backend/src/modules/webhook/webhook.controller.ts
external_apps/backend/src/modules/webhook/webhook.routes.ts
external_apps/backend/src/modules/webhook/webhook.service.ts

## Existing tests
external_apps/backend/tests/api/auth.spec.ts
external_apps/backend/tests/api/health.spec.ts
external_apps/backend/tests/auth.test.ts
external_apps/backend/tests/department.test.ts
external_apps/backend/tests/employee.test.ts
external_apps/backend/tests/setup.ts
external_apps/backend/tests/user.test.ts
external_apps/mobile-app/e2e/config.json
external_apps/mobile-app/e2e/firstTest.e2e.ts
external_apps/mobile-app/e2e/login.e2e.ts
external_apps/web-admin/tests/example.spec.ts
external_apps/web-admin/tests/login.spec.ts
external_apps/web-public/tests/example.spec.ts
external_apps/web-public/tests/login.spec.ts

## Environment keys (names only)
PORT
NODE_ENV
API_PREFIX
DB_HOST
DB_PORT
DB_USER
DB_PASS
DB_NAME
DATABASE_URL
REDIS_HOST
REDIS_PORT
REDIS_PASSWORD
JWT_SECRET
JWT_EXPIRES_IN
JWT_REFRESH_SECRET
JWT_REFRESH_EXPIRES_IN
TOTP_APP_NAME
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
EMAIL_FROM
FIREBASE_CREDENTIAL_PATH
ADMIN_EMAIL
ADMIN_PASSWORD
