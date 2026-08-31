#!/bin/bash

# Start All Backend Services
# This script starts the API Gateway and all microservices

set -e

echo "=========================================="
echo "🚀 Starting Backend Services"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check Docker services
echo "📦 Step 1: Checking infrastructure services..."

# Check RabbitMQ
if ! docker ps --filter "name=dev_rabbitmq" --format "{{.Names}}" | grep -q "dev_rabbitmq"; then
    echo -e "${YELLOW}⚠️  RabbitMQ not running. Starting infrastructure...${NC}"
    npm run docker:dev
    sleep 5
else
    echo -e "${GREEN}✅ RabbitMQ is running${NC}"
fi

# Check PostgreSQL
if ! docker ps --filter "name=dev_postgres" --format "{{.Names}}" | grep -q "dev_postgres"; then
    echo -e "${YELLOW}⚠️  PostgreSQL not running. Starting infrastructure...${NC}"
    npm run docker:dev
    sleep 5
else
    echo -e "${GREEN}✅ PostgreSQL is running${NC}"
fi

echo ""

# Step 2: Verify RabbitMQ connection
echo "🔍 Step 2: Verifying RabbitMQ connection..."
if curl -s -u guest:guest http://localhost:15672/api/overview > /dev/null 2>&1; then
    echo -e "${GREEN}✅ RabbitMQ management API is accessible${NC}"
else
    echo -e "${YELLOW}⚠️  RabbitMQ management API not accessible, waiting...${NC}"
    sleep 3
fi
echo ""

# Step 3: Start NestJS services
echo "🎯 Step 3: Starting NestJS services..."
echo ""
echo -e "${BLUE}This will start:${NC}"
echo "  - API Gateway (port 3000)"
echo "  - Auth Service"
echo "  - User Service"
echo "  - And other microservices"
echo ""
echo -e "${YELLOW}💡 Services will run in the background with hot-reload enabled${NC}"
echo ""

# Start the development server
echo -e "${GREEN}🚀 Starting development server...${NC}"
echo ""

# Run in background
npm run start:dev &

# Wait a moment for services to initialize
echo "⏳ Waiting for services to initialize..."
sleep 10

# Step 4: Verify services
echo ""
echo "🔍 Step 4: Verifying services..."
echo ""

# Check API Gateway
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API Gateway is running (port 3000)${NC}"
else
    echo -e "${YELLOW}⚠️  API Gateway is starting... (check logs)${NC}"
fi

# Check Auth Service health
echo ""
echo "🧪 Step 5: Testing authentication endpoint..."
echo ""

LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"123456"}')

if echo "$LOGIN_RESPONSE" | grep -q "access_token"; then
    echo -e "${GREEN}✅ Authentication service is working!${NC}"
    echo ""
    echo -e "${BLUE}Login successful!${NC}"
    echo "$LOGIN_RESPONSE" | head -c 200
    echo "..."
else
    echo -e "${YELLOW}⚠️  Auth service may still be initializing${NC}"
    echo ""
    echo "Response: $LOGIN_RESPONSE"
    echo ""
    echo -e "${BLUE}💡 Try again in a few seconds or check logs:${NC}"
    echo -e "   ${BLUE}npm run docker:dev:logs${NC}"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Backend Services Started!${NC}"
echo "=========================================="
echo ""
echo "📊 Service URLs:"
echo "   API Gateway:    http://localhost:3000"
echo "   RabbitMQ Mgmt:  http://localhost:15672 (guest/guest)"
echo "   PostgreSQL:     localhost:5432"
echo ""
echo "🔐 Test Login:"
echo "   Email: admin@gmail.com"
echo "   Password: 123456"
echo ""
echo "📝 Useful Commands:"
echo "   View logs:     npm run docker:dev:logs"
echo "   Stop services: Ctrl+C in the service terminal"
echo "   Restart:       npm run start:dev"
echo ""
echo "🌐 Frontend:"
echo "   Web Public:    http://localhost:4000"
echo ""
