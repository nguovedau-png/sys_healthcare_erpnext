#!/bin/bash

# Complete Database Seed & Test Script
# This script seeds ALL services and tests the API

set -e

echo "=========================================="
echo "🚀 Complete Database Seed & Test"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check Docker
echo "📦 Step 1: Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker is running${NC}"
echo ""

# Step 2: Check database container
echo "🗄️  Step 2: Checking database..."
if ! docker ps --filter "name=backend-db-1" --format "{{.Names}}" | grep -q "backend-db-1"; then
    echo -e "${YELLOW}⚠️  Starting database container...${NC}"
    npm run docker:dev
    sleep 5
else
    echo -e "${GREEN}✅ Database is running${NC}"
fi
echo ""

# Step 3: Migrate ALL services
echo "📊 Step 3: Migrating ALL services..."
echo "This will create databases for all services..."
echo ""

bash migrate_all.sh

echo ""
echo -e "${GREEN}✅ All migrations complete${NC}"
echo ""

# Step 4: Generate all Prisma clients
echo "🔧 Step 4: Generating Prisma clients..."
for schema in apps/*/prisma/schema.prisma; do
    service=$(echo $schema | cut -d'/' -f2)
    echo "Generating: $service"
    npx prisma generate --schema=$schema 2>/dev/null
done
echo -e "${GREEN}✅ All Prisma clients generated${NC}"
echo ""

# Step 5: Seed user-service (main service with users/roles/permissions)
echo "🌱 Step 5: Seeding user-service..."
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_db?schema=public" npx prisma db seed --schema=apps/user-service/prisma/schema.prisma
echo -e "${GREEN}✅ user-service seeded${NC}"
echo ""

# Step 6: Verify user-service data
echo "🔍 Step 6: Verifying user-service data..."
docker exec backend-db-1 psql -U postgres -d user_db -c 'SELECT 
    (SELECT COUNT(*) FROM "User") as users,
    (SELECT COUNT(*) FROM "Role") as roles,
    (SELECT COUNT(*) FROM "Permission") as permissions;'
echo ""

# Step 7: List all databases
echo "📋 Step 7: Listing all databases..."
docker exec backend-db-1 psql -U postgres -c '\l' | grep -E "_db|saas_microservices"
echo ""

# Step 8: Test API endpoint
echo "🧪 Step 8: Testing API..."
echo "Checking if user-service is running on port 3006..."

if curl -s http://localhost:3006 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ user-service is running${NC}"
    echo ""
    echo "Testing GET /users endpoint..."
    curl -s http://localhost:3006/users | head -20
else
    echo -e "${YELLOW}⚠️  user-service is not running${NC}"
    echo "To start it, run: npm run start:dev"
fi
echo ""

# Step 9: Summary
echo "=========================================="
echo -e "${GREEN}✅ Complete Setup Summary${NC}"
echo "=========================================="
echo ""
echo "📊 Database Status:"
docker exec backend-db-1 psql -U postgres -d user_db -c 'SELECT 
    (SELECT COUNT(*) FROM "User") as "Users",
    (SELECT COUNT(*) FROM "Role") as "Roles",
    (SELECT COUNT(*) FROM "Permission") as "Permissions";'
echo ""
echo "🔐 Test Credentials:"
echo "   Admin: admin@gmail.com / 123456"
echo "   Test:  test@example.com / test123"
echo ""
echo "🚀 Next Steps:"
echo "   1. Start all services: npm run start:dev"
# echo "   2. Test API: curl http://localhost:3006/users"
echo "   3. View logs: npm run docker:dev:logs"
echo ""
