#!/bin/bash

# ==========================================
# Quick Start Script - Dev Environment
# ==========================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting Healthcare System Dev Environment...${NC}"
echo ""

cd "$(dirname "$0")"

# Determine docker compose command
if docker compose version &> /dev/null; then
    DC="docker compose"
else
    DC="docker-compose"
fi

# Start infrastructure
echo "📦 Starting Docker infrastructure..."
$DC -f docker-compose.dev.yml up -d

# Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 5

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📚 Installing dependencies..."
    npm install
fi

# Run migrations
echo "🗄️ Running database migrations..."
chmod +x migrate_all.sh
./migrate_all.sh

# Seed database
echo "🌱 Seeding database..."
npx ts-node scripts/seed.ts

echo ""
echo -e "${GREEN}✅ Setup complete! Starting services...${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 Services:"
echo "   • API:           http://localhost:3000"
echo "   • RabbitMQ UI:   http://localhost:15672"
echo "   • PostgreSQL:    localhost:5432"
echo "   • Redis:         localhost:6379"
echo "   • Elasticsearch: http://localhost:9200"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start services
npm run start:dev
