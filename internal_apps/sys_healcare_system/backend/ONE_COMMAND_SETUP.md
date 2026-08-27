# 🚀 One-Command Setup & Start Guide

## Quick Start (Recommended)

### Option 1: Using npm script (Easiest)
```bash
npm run dev:full
```

### Option 2: Using bash script directly
```bash
./start-dev.sh
```

### Option 3: Step by step with npm
```bash
# All in one command
npm run dev:start

# Or manually step by step
npm run docker:dev        # Start infrastructure
npm install               # Install dependencies
npm run migrate:all       # Run migrations
npm run seed              # Seed database
npm run start:dev         # Start services
```

---

## 📋 What the Script Does

When you run `npm run dev:full` or `./start-dev.sh`, it automatically:

1. ✅ **Starts Docker Infrastructure**
   - PostgreSQL (Database)
   - Redis (Cache & Queue)
   - RabbitMQ (Message Broker)
   - Elasticsearch (Search Engine)

2. ✅ **Waits for Services** 
   - Health checks for all infrastructure
   - Ensures everything is ready before proceeding

3. ✅ **Installs Dependencies**
   - Auto-detects npm/yarn/pnpm
   - Installs only if node_modules doesn't exist

4. ✅ **Runs Database Migrations**
   - Migrates all 28+ microservice databases
   - Uses the migrate_all.sh script

5. ✅ **Seeds Database**
   - Creates admin user
   - Adds initial data
   - Sets up master data

6. ✅ **Starts All Services**
   - Runs all NestJS services locally
   - Hot-reload enabled for development
   - Services run with watch mode

---

## 🎯 Available Commands

### Docker Management
```bash
npm run docker:dev          # Start infrastructure
npm run docker:dev:down     # Stop infrastructure
npm run docker:dev:logs     # View infrastructure logs
```

### Database
```bash
npm run migrate:all         # Run all migrations
npm run seed                # Seed database
```

### Development
```bash
npm run dev:setup           # Setup without starting services
npm run dev:start           # Setup + start services
npm run dev:full            # Interactive full setup (recommended)
npm run start:dev           # Start services only (no setup)
npm run setup:full          # Detailed setup with progress
```

---

## 📍 Service URLs

After setup completes:

| Service | URL | Credentials |
|---------|-----|-------------|
| **API Gateway** | http://localhost:3000 | - |
| **RabbitMQ UI** | http://localhost:15672 | guest / guest |
| **PostgreSQL** | localhost:5432 | postgres / postgres |
| **Redis** | localhost:6379 | - |
| **Elasticsearch** | http://localhost:9200 | - |

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find what's using the port
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis
lsof -i :3000  # API

# Kill the process
kill -9 <PID>
```

### Docker Services Not Starting
```bash
# Check Docker status
docker ps

# View logs
npm run docker:dev:logs

# Restart infrastructure
npm run docker:dev:down
npm run docker:dev
```

### Migration Failed
```bash
# Check if PostgreSQL is running
docker exec dev_postgres pg_isready -U postgres

# Restart PostgreSQL
docker-compose -f docker-compose.dev.yml restart db

# Re-run migrations
npm run migrate:all
```

### Need Fresh Start
```bash
# Stop everything
npm run docker:dev:down

# Remove all data
docker-compose -f docker-compose.dev.yml down -v

# Start fresh
npm run dev:full
```

---

## 💡 Tips

1. **First Time**: Use `npm run dev:full` for complete setup
2. **Daily Use**: Use `npm run start:dev` if infrastructure is already running
3. **Work on One Service**: Start only what you need:
   ```bash
   npm run start:dev auth-service
   ```
4. **Check Infrastructure**: 
   ```bash
   docker-compose -f docker-compose.dev.yml ps
   ```
5. **View Logs**:
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f db
   ```

---

## 🎉 Success Indicators

When setup is successful, you'll see:
```
✅ Setup complete! Starting services...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Services:
   • API:           http://localhost:3000
   • RabbitMQ UI:   http://localhost:15672
   • PostgreSQL:    localhost:5432
   • Redis:         localhost:6379
   • Elasticsearch: http://localhost:9200
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

All services will start with hot-reload enabled. Any code changes will automatically restart the affected service!
