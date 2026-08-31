#!/bin/bash

# Web Public Setup Script
# This script sets up the frontend for development

set -e

echo "=========================================="
echo "🚀 Web Public Setup"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check Node.js
echo "📦 Step 1: Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version must be 18 or higher (current: $(node -v))${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"
echo ""

# Step 2: Check if .env.local exists
echo "🔧 Step 2: Checking environment configuration..."
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    echo "📋 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo -e "${GREEN}✅ .env.local created${NC}"
    echo ""
    echo -e "${BLUE}📝 Default configuration:${NC}"
    echo "   API URL: http://localhost:3000"
    echo "   Socket URL: http://localhost:3001"
    echo "   App URL: http://localhost:4000"
    echo ""
    echo -e "${YELLOW}💡 Edit .env.local to customize settings${NC}"
else
    echo -e "${GREEN}✅ .env.local already exists${NC}"
fi
echo ""

# Step 3: Install dependencies
echo "📚 Step 3: Installing dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules already exists${NC}"
    echo "🤔 Do you want to reinstall dependencies? (y/N)"
    read -r response
    if [[ "$response" =~ ^[yY][eE][sS]|[yY]$ ]]; then
        echo "🗑️  Removing old node_modules..."
        rm -rf node_modules
        echo "📦 Installing dependencies..."
        npm install
    else
        echo -e "${GREEN}✅ Skipping installation${NC}"
    fi
else
    echo "📦 Installing dependencies..."
    npm install
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 4: Verify backend connection
echo "🔍 Step 4: Checking backend connectivity..."
API_URL=$(grep NEXT_PUBLIC_API_URL .env.local | cut -d'=' -f2)
if curl -s "$API_URL" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend API is reachable at $API_URL${NC}"
else
    echo -e "${YELLOW}⚠️  Backend API is not reachable at $API_URL${NC}"
    echo "💡 Make sure backend is running:"
    echo "   cd ../backend"
    echo "   npm run start:dev"
fi
echo ""

# Step 5: Summary
echo "=========================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "📊 Configuration:"
echo "   Environment file: .env.local"
echo "   API URL: $API_URL"
echo "   App URL: http://localhost:4000"
echo ""
echo "🚀 Next Steps:"
echo "   1. Start development server:"
echo -e "      ${BLUE}npm run dev${NC}"
echo ""
echo "   2. Open in browser:"
echo -e "      ${BLUE}http://localhost:4000${NC}"
echo ""
echo "   3. View environment guide:"
echo -e "      ${BLUE}cat ENV_GUIDE.md${NC}"
echo ""
echo "📝 Available Commands:"
echo "   npm run dev     - Start development server"
echo "   npm run build   - Build for production"
echo "   npm run start   - Start production server"
echo "   npm run lint    - Run linter"
echo ""
echo "🔐 Test Credentials (after seeding):"
echo "   Email: admin@gmail.com"
echo "   Password: 123456"
echo ""
