# Backend Development Guide

## 📋 Overview

This project supports two deployment modes:
- **Development**: Infrastructure in Docker, NestJS services run locally (hot-reload enabled)
- **Production**: Everything runs in Docker containers

## 🚀 Development Setup

### 1. Start Infrastructure Services Only

```bash
# Start PostgreSQL, Redis, RabbitMQ, and Elasticsearch
docker-compose -f docker-compose.dev.yml up -d

# Check if services are running
docker-compose -f docker-compose.dev.yml ps
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Database Migrations

```bash
# For each service, run migrations
npx prisma migrate dev --schema=apps/auth-service/prisma/schema.prisma
npx prisma migrate dev --schema=apps/user-service/prisma/schema.prisma
# ... repeat for other services
```

### 4. Start Services Locally

#### Option A: Start All Services (Development Mode)
```bash
npm run start:dev
```

#### Option B: Start Individual Service
```bash
# Start API Gateway
npm run start:dev api-gateway

# Start Auth Service
npm run start:dev auth-service

# Start User Service
npm run start:dev user-service
```

#### Option C: Start Multiple Specific Services
```bash
# Start only the services you're working on
npm run start:dev api-gateway auth-service user-service
```

### 5. Access Services

- **API Gateway**: http://localhost:3000
- **RabbitMQ Management**: http://localhost:15672 (guest/guest)
- **PostgreSQL**: localhost:5432 (postgres/postgres)
- **Redis**: localhost:6379
- **Elasticsearch**: http://localhost:9200

## 🏭 Production Setup

### Build and Start All Services

```bash
# Build all services (sequential to avoid resource issues)
docker-compose build --parallel=false

# Start all services
docker-compose up -d

# Or build and start in one command
docker-compose up -d --build --parallel=false
```

### Scale Services (if needed)

```bash
docker-compose up -d --scale auth-service=3 --scale user-service=2
```

## 📝 Environment Configuration

### Development (.env)

Create a `.env` file in the backend root:

```env
# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@localhost:5672

# Database
DATABASE_URL_AUTH=postgresql://postgres:postgres@localhost:5432/auth_db?schema=public
DATABASE_URL_USER=postgresql://postgres:postgres@localhost:5432/user_db?schema=public
# ... add for other services

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Elasticsearch
ELASTICSEARCH_URL=http://localhost:9200

# JWT & Security
JWT_SECRET=supersecret
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

## 🔧 Useful Commands

### Docker Compose (Development)
```bash
# Start infrastructure
docker-compose -f docker-compose.dev.yml up -d

# Stop infrastructure
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Restart a specific service
docker-compose -f docker-compose.dev.yml restart db

# Clean up all data
docker-compose -f docker-compose.dev.yml down -v
```

### Docker Compose (Production)
```bash
# Build and start
docker-compose up -d --build --parallel=false

# Stop all services
docker-compose down

# View logs
docker-compose logs -f api-gateway

# Rebuild specific service
docker-compose build auth-service
docker-compose up -d auth-service
```

### Local Development
```bash
# Install dependencies
npm install

# Run migrations for all services
npm run migrate:all

# Seed database
npm run seed

# Run tests
npm run test

# Run tests for specific service
npm run test auth-service
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5432  # For PostgreSQL
lsof -i :6379  # For Redis
lsof -i :5672  # For RabbitMQ

# Kill process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose -f docker-compose.dev.yml ps db

# Restart database
docker-compose -f docker-compose.dev.yml restart db

# Check database logs
docker-compose -f docker-compose.dev.yml logs db
```

### Prisma Client Not Generated
```bash
# Regenerate Prisma Client for a service
npx prisma generate --schema=apps/auth-service/prisma/schema.prisma
```

### Docker Build Fails (RPC Error)
```bash
# Always use sequential builds
docker-compose build --parallel=false

# Or increase Docker Desktop memory allocation
# Settings → Resources → Memory (recommend 8GB+)
```

## 📂 Project Structure

```
backend/
├── apps/                    # NestJS microservices
│   ├── api-gateway/
│   ├── auth-service/
│   ├── user-service/
│   └── ... (20+ services)
├── docker-compose.yml       # Production (all services in Docker)
├── docker-compose.dev.yml   # Development (infrastructure only)
├── package.json
└── README.md
```

## 💡 Development Tips

1. **Hot Reload**: When running services locally with `npm run start:dev`, changes are automatically detected
2. **Work on One Service**: Start only the services you're actively developing
3. **Use Docker Desktop**: Monitor resource usage and adjust limits if needed
4. **Database GUI**: Use tools like pgAdmin or DBeaver to inspect PostgreSQL
5. **RabbitMQ UI**: Monitor message queues at http://localhost:15672
