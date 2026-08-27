FROM node:20-alpine AS base
RUN apk add --no-cache openssl libc6-compat

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client for this service
RUN if [ -f "apps/marketing-service/prisma/schema.prisma" ]; then \
        npx prisma generate --schema apps/marketing-service/prisma/schema.prisma; \
    fi

RUN npx nest build marketing-service

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist/apps/marketing-service ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose ports (can be overridden by docker-compose)
EXPOSE 3000

CMD ["node", "dist/main"]
