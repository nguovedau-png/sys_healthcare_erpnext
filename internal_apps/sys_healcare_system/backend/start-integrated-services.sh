#!/bin/bash
pkill -f "node dist/apps" || true
pkill -f nest || true
sleep 2

# Use 127.0.0.1 instead of localhost to avoid IPv6 issues
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/erp_db?schema=public" node dist/apps/erp-service/main.js &
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/user_db?schema=public" node dist/apps/user-service/main.js &
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/booking_db?schema=public" node dist/apps/booking-service/main.js &
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/shop_db?schema=public" node dist/apps/shop-service/main.js &
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/finance_db?schema=public" node dist/apps/finance-service/main.js &
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/seminar_db?schema=public" node dist/apps/seminar-service/main.js &
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/engagement_db?schema=public" node dist/apps/engagement-service/main.js &
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/content_db?schema=public" node dist/apps/content-service/main.js &
node dist/apps/api-gateway/main.js &

echo "Services started in background using node and 127.0.0.1."
