# Backend Startup Guide

## ❗ Important: How to Start Backend Services

### Problem
The 503 Circuit Breaker error occurs because the NestJS backend services are not running.

### Architecture

This is a **NestJS Monorepo** with microservices architecture:
- **API Gateway** (port 3000) - Main entry point
- **Auth Service** - Authentication via RabbitMQ
- **User Service** - User management via RabbitMQ
- **25+ other microservices** - All communicate via RabbitMQ

### Quick Fix - Start the Backend

**Option 1: Start API Gateway Only (For Testing Login)**

```bash
cd /Users/mithang/Downloads/ProjectEcosystems/sys_healthcare_erpnext/internal_apps/sys_healcare_system/backend

# Build first
npx nest build api-gateway

# Then run
node dist/apps/api-gateway/main.js
```

**Option 2: Start with Watch Mode (Development)**

```bash
cd /Users/mithang/Downloads/ProjectEcosystems/sys_healthcare_erpnext/internal_apps/sys_healcare_system/backend

# This will start with hot-reload
npx nest start api-gateway --watch
```

**Option 3: Use the Startup Script**

```bash
cd /Users/mithang/Downloads/ProjectEcosystems/sys_healthcare_erpnext/internal_apps/sys_healcare_system/backend

# Run the automated startup script
npm run start:all
```

---

## Prerequisites Checklist

Before starting the backend, ensure:

- [x] **Docker is running**
- [x] **RabbitMQ container is running** (port 5672, 15672)
- [x] **PostgreSQL container is running** (port 5432)
- [x] **Database is seeded** (run `npm run seed:user`)

Check infrastructure:
```bash
docker ps
```

You should see:
- `dev_rabbitmq` - RabbitMQ message broker
- `dev_postgres` - PostgreSQL database

---

## Step-by-Step Startup

### Step 1: Verify Infrastructure

```bash
# Check Docker containers
docker ps --filter "name=dev_"

# Should show:
# dev_rabbitmq
# dev_postgres
```

### Step 2: Build the API Gateway

```bash
cd backend
npx nest build api-gateway
```

### Step 3: Start the Service

```bash
# Option A: Production mode
node dist/apps/api-gateway/main.js

# Option B: Development mode (with watch)
npx nest start api-gateway --watch
```

### Step 4: Verify It's Running

```bash
# Check health endpoint
curl http://localhost:3000/health

# Test login
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"123456"}'
```

---

## Troubleshooting

### Error: "Service temporarily unavailable (Circuit Breaker)"

**Cause:** Backend services are not running

**Solution:**
1. Start the API Gateway (see above)
2. Wait 10-15 seconds for services to initialize
3. Try login again

### Error: "Cannot connect to RabbitMQ"

**Cause:** RabbitMQ container is not running

**Solution:**
```bash
# Start infrastructure
npm run docker:dev

# Wait for it to start
sleep 5

# Verify
curl -u guest:guest http://localhost:15672
```

### Error: "Database connection failed"

**Cause:** PostgreSQL is not running or database not seeded

**Solution:**
```bash
# Check if PostgreSQL is running
docker ps --filter "name=dev_postgres"

# If not running, start it
npm run docker:dev

# Seed the database
npm run seed:user
```

### Error: "Cannot find module dist/apps/..."

**Cause:** Build issue or wrong entry point

**Solution:**
```bash
# Clean and rebuild
rm -rf dist
npx nest build api-gateway

# Run
node dist/apps/api-gateway/main.js
```

---

## Service Ports

| Service | Port | Purpose |
|---------|------|---------|
| API Gateway | 3000 | Main REST API |
| RabbitMQ Management | 15672 | Message broker UI (guest/guest) |
| RabbitMQ | 5672 | Message broker |
| PostgreSQL | 5432 | Database |
| Web Public Frontend | 4000 | Next.js frontend |

---

## Test Credentials

After seeding the database:

```
Email: admin@gmail.com
Password: 123456
```

---

## Architecture Diagram

```
Frontend (web-public)
    ↓ HTTP
API Gateway (port 3000)
    ↓ RabbitMQ
Microservices:
  - Auth Service (auth_queue)
  - User Service (user_queue)
  - Payment Service (payment_queue)
  - ... (25+ services)
    ↓
PostgreSQL (databases per service)
```

---

## Common Commands

```bash
# Start infrastructure (Docker)
npm run docker:dev

# Stop infrastructure
npm run docker:dev:down

# View infrastructure logs
npm run docker:dev:logs

# Build API Gateway
npx nest build api-gateway

# Start API Gateway
npx nest start api-gateway --watch

# Seed user database
npm run seed:user

# Verify data
npm run verify:data

# Run all migrations
npm run migrate:all
```

---

## Development Workflow

1. **Start infrastructure:**
   ```bash
   npm run docker:dev
   ```

2. **Seed database (first time only):**
   ```bash
   npm run seed:user
   ```

3. **Start backend:**
   ```bash
   npx nest start api-gateway --watch
   ```

4. **Start frontend (in another terminal):**
   ```bash
   cd ../web-public
   npm run dev
   ```

5. **Access application:**
   - Frontend: http://localhost:4000
   - Backend API: http://localhost:3000
   - RabbitMQ UI: http://localhost:15672

---

## Need Help?

1. Check if infrastructure is running: `docker ps`
2. Check backend logs (in the terminal where you started it)
3. Check RabbitMQ UI: http://localhost:15672
4. Verify database has data: `npm run verify:data`

---

## Quick Reference Card

```bash
# === ONE-LINE STARTUP ===
cd backend && npm run docker:dev && sleep 5 && npm run seed:user && npx nest start api-gateway --watch

# === TEST LOGIN ===
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"123456"}'

# === CHECK STATUS ===
docker ps && curl http://localhost:3000/health
```
