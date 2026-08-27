# Implementation audit baseline

## Repository

- Repository: `nguovedau-png/sys_healthcare_erpnext`
- Working tree was cloned from GitHub and initially reported clean on the default branch.
- The repository is a monorepo containing Frappe/ERPNext/HRMS apps, custom apps, external apps, and `internal_apps/sys_healcare_system`.

## Existing healthcare platform

The current healthcare platform is described as a NestJS microservices system. The documented components include an API gateway, auth service, user service, booking service, content service, notification service, and additional specialized services. The documented web surfaces are Next.js 14 admin and public applications; mobile is described as partial/planned. The backend manifest includes NestJS 10, Prisma 5, PostgreSQL/MySQL-related infrastructure, RabbitMQ, Redis/Bull, Socket.IO, Swagger, JWT, Helmet, throttling, bcrypt, and Jest.

## Existing functional areas

The repository contains code and/or applications for authentication, user management, booking/appointments, lab tests, pharmacy orders, CMS/health content, notifications, telemedicine, e-commerce, gamification, and administration. It also contains a substantial ERPNext/Frappe/HRMS stack and multiple scripts related to workspaces, doctypes, seed data, synchronization, and LM Pharma/booking configurations.

## Risks and gaps observed

- The README is aspirational and does not prove production readiness for every listed service.
- Mobile support is incomplete or inconsistent across apps.
- A repository-wide scan found hard-coded demo credentials and placeholder passwords in mobile/web code and bot text files; these must be removed or isolated from production paths.
- The repository has generated Prisma client artifacts and many operational scripts, so scope must be controlled around the active healthcare product rather than rewriting all historical artifacts.
- ERPNext is present in the repository, but an explicit canonical mapping, sync contract, idempotency strategy, conflict policy, webhook verification, and audit trail for the healthcare platform still need to be established.
- Tests exist in the backend toolchain, but coverage and executable test inventory must be verified before claiming readiness.

## Initial implementation principle

Use ERPNext as the source of truth for CRM, ERP, HR, and accounting records. Keep healthcare-specific orchestration, patient-facing UX, scheduling workflow, integration state, and audit metadata in the healthcare platform, with explicit ownership per field and idempotent synchronization into ERPNext.
