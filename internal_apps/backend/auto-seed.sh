#!/bin/bash

# Automated Database Setup and Seed Script
# This script ensures database is running, migrations are applied, and data is seeded

set -e  # Exit on error

echo "=========================================="
echo "🚀 Automated Database Setup & Seed Script"
echo "=========================================="
echo ""

# Step 1: Check if Docker is running
echo "📦 Step 1: Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi
echo "✅ Docker is running"
echo ""

# Step 2: Check if database container is running
echo "🗄️  Step 2: Checking database container..."
if ! docker ps --filter "name=dev_postgres" --format "{{.Names}}" | grep -q "dev_postgres"; then
    echo "⚠️  Database container not found. Starting infrastructure..."
    npm run docker:dev
    echo "⏳ Waiting for database to be ready..."
    sleep 5
else
    echo "✅ Database container is running"
fi
echo ""

# Step 3: Generate Prisma Client
echo "🔧 Step 3: Generating Prisma Client..."
npx prisma generate --schema=apps/user-service/prisma/schema.prisma
echo "✅ Prisma Client generated"
echo ""

# Step 4: Run Database Migrations
echo "📊 Step 4: Running database migrations..."
npx prisma migrate dev --schema=apps/user-service/prisma/schema.prisma --name auto_migration
echo "✅ Migrations completed"
echo ""

# Step 5: Check if data exists
echo "🔍 Step 5: Checking existing data..."
USER_COUNT=$(npx ts-node -r tsconfig-paths/register --compiler-options '{"module":"CommonJS"}' -e "
const { PrismaClient } = require('@prisma/client-user-service');
const prisma = new PrismaClient();
prisma.user.count().then(count => { console.log(count); prisma.\$disconnect(); });
" 2>/dev/null | tail -1)

if [ -z "$USER_COUNT" ] || [ "$USER_COUNT" -eq 0 ] 2>/dev/null; then
    echo "⚠️  No data found in database"
    NEED_SEED=true
else
    echo "✅ Found $USER_COUNT users in database"
    echo "🤔 Do you want to re-seed the database? (y/N)"
    read -r response
    if [[ "$response" =~ ^[yY][eE][sS]|[yY]$ ]]; then
        echo "🔄 Resetting database..."
        npx prisma migrate reset --schema=apps/user-service/prisma/schema.prisma --force
        NEED_SEED=true
    else
        echo "✅ Keeping existing data"
        NEED_SEED=false
    fi
fi
echo ""

# Step 6: Seed Database
if [ "$NEED_SEED" = true ]; then
    echo "🌱 Step 6: Seeding database..."
    npx prisma db seed --schema=apps/user-service/prisma/schema.prisma
    echo "✅ Database seeded successfully"
else
    echo "⏭️  Step 6: Skipped (user chose to keep existing data)"
fi
echo ""

# Step 7: Verify Data
echo "✅ Step 7: Verifying data..."
npx ts-node -r tsconfig-paths/register --compiler-options '{"module":"CommonJS"}' apps/user-service/prisma/verify-data.ts
echo ""

echo "=========================================="
echo "🎉 Database Setup Complete!"
echo "=========================================="
echo ""
echo "📝 Test Credentials:"
echo "   Admin: admin@gmail.com / 123456"
echo "   Test:  test@example.com / test123"
echo ""
echo "🚀 Next Steps:"
echo "   - Start development server: npm run start:dev"
echo "   - View API documentation: http://localhost:3000/api"
echo ""
