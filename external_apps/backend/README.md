# HD Template Backend

This is the backend for the HD Template project, built with Node.js, Express, TypeScript, and Prisma.

## Tech Stack
* **Language**: TypeScript
* **Framework**: Express.js
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Caching/Queue**: Redis
* **Jobs**: BullMQ
* **Logging**: Winston

## Prerequisites
* Node.js >= 18
* Docker & Docker Compose

## Setup
1. Copy `.env.example` to `.env` and fill in the values.
2. Start the database and redis:
   ```bash
   docker-compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Seed database:
   ```bash
   npx prisma db seed
   ```

## Running the Server
* Development: `npm run dev`
* Production: `npm start`
* Build: `npm run build`

## API Documentation
Swagger documentation is available at `http://localhost:3000/api-docs` when the server is running.

## Features
* **Auth**: JWT, Refresh Token, 2FA (TOTP), Password Reset.
* **RBAC**: Role-based access control with granular permissions.
* **Audit Logs**: Automatic logging of system actions.
* **Jobs**: Email sending, Push Notifications, Background processing.
* **Chat**: Real-time chat using Socket.io.
