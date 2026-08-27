#!/bin/bash

# ==========================================
# Complete Development Setup Script
# Starts Docker infrastructure, installs dependencies,
# runs migrations, seeds data, and starts all services
# ==========================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Log functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Banner
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║   🚀 Healthcare System - Complete Dev Setup             ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Get the script's directory (backend folder)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

log_info "Working directory: $SCRIPT_DIR"
echo ""

# ==========================================
# Step 1: Start Docker Infrastructure
# ==========================================
log_info "Step 1/6: Starting Docker infrastructure (PostgreSQL, Redis, RabbitMQ, Elasticsearch)..."
echo ""

if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    log_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Try docker compose (v2) first, fallback to docker-compose (v1)
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

$DOCKER_COMPOSE -f docker-compose.dev.yml up -d

if [ $? -eq 0 ]; then
    log_success "Docker infrastructure started successfully"
else
    log_error "Failed to start Docker infrastructure"
    exit 1
fi

echo ""
log_info "Waiting for services to be ready..."
sleep 5

# ==========================================
# Step 2: Check Service Health
# ==========================================
log_info "Step 2/6: Checking service health..."
echo ""

# Check PostgreSQL
log_info "Checking PostgreSQL..."
for i in {1..30}; do
    if docker exec dev_postgres pg_isready -U postgres &> /dev/null; then
        log_success "PostgreSQL is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        log_error "PostgreSQL failed to start within timeout"
        exit 1
    fi
    sleep 1
done

# Check Redis
log_info "Checking Redis..."
if docker exec dev_redis redis-cli ping &> /dev/null; then
    log_success "Redis is ready"
else
    log_warning "Redis may not be ready yet"
fi

# Check RabbitMQ
log_info "Checking RabbitMQ..."
for i in {1..30}; do
    if curl -s -u guest:guest http://localhost:15672/api/overview &> /dev/null; then
        log_success "RabbitMQ is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        log_warning "RabbitMQ management UI may not be ready yet (this is okay)"
    fi
    sleep 1
done

# Check Elasticsearch
log_info "Checking Elasticsearch..."
for i in {1..30}; do
    if curl -s http://localhost:9200 &> /dev/null; then
        log_success "Elasticsearch is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        log_warning "Elasticsearch may not be ready yet"
    fi
    sleep 1
done

echo ""

# ==========================================
# Step 3: Install Dependencies
# ==========================================
log_info "Step 3/6: Installing dependencies..."
echo ""

if [ -f "package.json" ]; then
    if command -v npm &> /dev/null; then
        log_info "Using npm to install dependencies..."
        npm install
    elif command -v yarn &> /dev/null; then
        log_info "Using yarn to install dependencies..."
        yarn install
    elif command -v pnpm &> /dev/null; then
        log_info "Using pnpm to install dependencies..."
        pnpm install
    else
        log_error "No package manager found (npm, yarn, or pnpm)"
        exit 1
    fi
    
    if [ $? -eq 0 ]; then
        log_success "Dependencies installed successfully"
    else
        log_error "Failed to install dependencies"
        exit 1
    fi
else
    log_warning "package.json not found, skipping dependency installation"
fi

echo ""

# ==========================================
# Step 4: Run Database Migrations
# ==========================================
log_info "Step 4/6: Running database migrations..."
echo ""

if [ -f "migrate_all.sh" ]; then
    chmod +x migrate_all.sh
    ./migrate_all.sh
    
    if [ $? -eq 0 ]; then
        log_success "Database migrations completed"
    else
        log_error "Some migrations failed"
        exit 1
    fi
else
    log_warning "migrate_all.sh not found, skipping migrations"
fi

echo ""

# ==========================================
# Step 5: Seed Database
# ==========================================
log_info "Step 5/6: Seeding database..."
echo ""

if [ -f "scripts/seed.ts" ]; then
    log_info "Running seed script..."
    npx ts-node scripts/seed.ts
    
    if [ $? -eq 0 ]; then
        log_success "Database seeded successfully"
    else
        log_error "Failed to seed database"
        exit 1
    fi
else
    log_warning "scripts/seed.ts not found, skipping seeding"
fi

echo ""

# ==========================================
# Step 6: Start All Services
# ==========================================
log_info "Step 6/6: Starting all NestJS services..."
echo ""

if [ -f "package.json" ]; then
    log_info "Starting services with hot-reload enabled..."
    log_info "Press Ctrl+C to stop all services"
    echo ""
    log_success "🎉 Development environment is ready!"
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}📍 Services Available:${NC}"
    echo -e "${GREEN}   • API Gateway:      http://localhost:3000${NC}"
    echo -e "${GREEN}   • RabbitMQ UI:      http://localhost:15672 (guest/guest)${NC}"
    echo -e "${GREEN}   • PostgreSQL:       localhost:5432${NC}"
    echo -e "${GREEN}   • Redis:            localhost:6379${NC}"
    echo -e "${GREEN}   • Elasticsearch:    http://localhost:9200${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    # Start all services in dev mode
    npm run start:dev
else
    log_error "package.json not found, cannot start services"
    exit 1
fi
