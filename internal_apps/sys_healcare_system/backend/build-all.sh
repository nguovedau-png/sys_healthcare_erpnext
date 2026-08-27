#!/bin/bash
# Build all active services one by one to avoid Docker RPC errors

set -e

echo "🔨 Building all services sequentially..."
echo ""

# Define services to build (only active services from docker-compose.yml)
SERVICES=(
  "rabbitmq"
  "db"
  "elasticsearch"
  "redis"
  "api-gateway"
  "auth-service"
  "user-service"
  "file-service"
  "notification-service"
  "setting-service"
  "search-service"
  "ai-service"
  "booking-service"
  "community-service"
  "content-service"
  "education-service"
  "engagement-service"
  "gamification-service"
  "live-service"
  "report-service"
  "seminar-service"
  "support-service"
)

TOTAL=${#SERVICES[@]}
CURRENT=0

for SERVICE in "${SERVICES[@]}"; do
  CURRENT=$((CURRENT + 1))
  echo "═══════════════════════════════════════════════"
  echo "📦 Building service $CURRENT/$TOTAL: $SERVICE"
  echo "═══════════════════════════════════════════════"
  
  if docker-compose -f docker-compose.yml build "$SERVICE"; then
    echo "✅ Successfully built $SERVICE"
  else
    echo "❌ Failed to build $SERVICE"
    echo "Retrying once..."
    if docker-compose -f docker-compose.yml build "$SERVICE"; then
      echo "✅ Successfully built $SERVICE on retry"
    else
      echo "❌ Failed to build $SERVICE after retry"
      exit 1
    fi
  fi
  
  echo ""
  
  # Small pause between builds to free resources
  sleep 2
done

echo "═══════════════════════════════════════════════"
echo "🎉 All services built successfully!"
echo "═══════════════════════════════════════════════"
echo ""
echo "Now starting all services..."
docker-compose -f docker-compose.yml up -d

echo ""
echo "✅ All services are running!"
docker-compose -f docker-compose.yml ps
