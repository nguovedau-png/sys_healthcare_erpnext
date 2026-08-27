#!/bin/bash

# Seed user-service data into user_db database

set -e

echo "=========================================="
echo "🌱 Seeding user-service into user_db"
echo "=========================================="
echo ""

# Set the correct DATABASE_URL for user-service
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_db?schema=public"

echo "📊 Using database: user_db"
echo "🔗 Connection: $DATABASE_URL"
echo ""

# Step 1: Generate Prisma Client
echo "🔧 Step 1: Generating Prisma Client..."
npx prisma generate --schema=apps/user-service/prisma/schema.prisma
echo -e "✅ Prisma Client generated\n"

# Step 2: Push schema to user_db
echo "📦 Step 2: Creating tables in user_db..."
npx prisma db push --schema=apps/user-service/prisma/schema.prisma --accept-data-loss
echo -e "✅ Tables created\n"

# Step 3: Seed data
echo "🌱 Step 3: Seeding data..."
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_db?schema=public" npx ts-node -r tsconfig-paths/register apps/user-service/prisma/seed.ts
echo -e "✅ Data seeded\n"

# Step 4: Verify
echo "🔍 Step 4: Verifying data in user_db..."
docker exec dev_postgres psql -U postgres -d user_db -c 'SELECT 
    (SELECT COUNT(*) FROM "User") as users,
    (SELECT COUNT(*) FROM "Role") as roles,
    (SELECT COUNT(*) FROM "Permission") as permissions;'

echo ""
echo "=========================================="
echo "✅ user-service seeding complete!"
echo "=========================================="
echo ""
echo "📊 Database: user_db"
echo "🔐 Test Credentials:"
echo "   Admin: admin@gmail.com / 123456"
echo "   Test:  test@example.com / test123"
echo ""
