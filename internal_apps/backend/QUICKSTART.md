# 🚀 Quick Start Guide

## Development Mode (Recommended for Daily Work)

### First Time Setup
```bash
# 1. Start infrastructure (PostgreSQL, Redis, RabbitMQ, Elasticsearch)
npm run docker:dev

# 2. Install dependencies
npm install

# 3. Run database migrations
npm run migrate:all

# Or do it all in one command:
npm run dev:setup
```

### Daily Development
```bash
# 1. Start infrastructure (if not already running)
npm run docker:dev

# 2. Start all services locally with hot-reload
npm run start:dev

# OR start specific services only (faster!)
npm run start:dev api-gateway auth-service user-service
```

### Access Your Services
- **API**: http://localhost:3000
- **RabbitMQ UI**: http://localhost:15672 (guest/guest)
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **Elasticsearch**: http://localhost:9200

---

## Production Mode

### Deploy Everything in Docker
```bash
# Build and start all services
npm run docker:prod

# This is equivalent to:
# docker-compose up -d --build --parallel=false
```

---

## Useful Commands

### Docker (Development)
```bash
npm run docker:dev        # Start infrastructure
npm run docker:dev:down   # Stop infrastructure
npm run docker:dev:logs   # View logs
```

### Docker (Production)
```bash
npm run docker:prod        # Build and start all
npm run docker:prod:down   # Stop all services
```

### Database
```bash
npm run migrate:auth   # Migrate auth service
npm run migrate:user   # Migrate user service
npm run migrate:all    # Migrate all services
```

---

## 💡 Pro Tips

1. **Work on one service at a time**: Start only the services you need
   ```bash
   npm run start:dev auth-service
   ```

2. **Watch mode enabled**: Changes auto-reload when running locally

3. **Check infrastructure status**:
   ```bash
   docker-compose -f docker-compose.dev.yml ps
   ```

4. **View infrastructure logs**:
   ```bash
   npm run docker:dev:logs
   ```

5. **Clean restart**:
   ```bash
   npm run docker:dev:down
   npm run docker:dev
   ```

---

## 📚 Documentation

- Full development guide: [DEVELOPMENT.md](./DEVELOPMENT.md)
- Production docker-compose: [docker-compose.yml](./docker-compose.yml)
- Development docker-compose: [docker-compose.dev.yml](./docker-compose.dev.yml)
