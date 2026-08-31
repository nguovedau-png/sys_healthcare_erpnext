# Healthcare SaaS Ecosystem

A comprehensive, microservices-based healthcare platform built with modern technologies.

## 🚀 Architecture Overview

This project simulates a real-world enterprise healthcare system with the following components:

- **Backend**: NestJS Microservices (RabbitMQ, Prisma, Postgres/MySQL).
- **Web Admin**: Next.js 14 (App Router) + Ant Design.
- **Web Public**: Next.js 14 (App Router) + TailwindCSS.
- **Mobile**: (Planned/Partial) React Native.

### Microservices List
- `api-gateway`: Entry point for all client requests.
- `auth-service`: Authentication & Authorization (JWT).
- `user-service`: User management.
- `booking-service`: Appointments, Lab Tests, Pharmacy Orders.
- `content-service`: CMS for Health News.
- `notification-service`: Real-time notifications (Socket.IO).
- ... (Includes 20+ specialized services like AI, Gamification, Finance, etc.)

## 🛠 Prerequisites

- **Node.js**: v18+
- **Docker**: For RabbitMQ and Database containers.
- **Yarn**: (Recommended package manager).

## ⚡ Quick Start

### 1. Start Infrastructure
Ensure you have a RabbitMQ instance running.
```bash
# Example if using Docker
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

### 2. Install & Build All
```bash
# Root directory
npm install
# Or manual install per app if monorepo tools aren't set up
cd backend && yarn install
cd ../web-admin && yarn install
cd ../web-public && yarn install
```

### 3. Run Development Servers
You will need multiple terminal tabs:

**Backend (API Gateway + Microservices)**
```bash
cd backend
yarn start:dev
```

**Web Admin (Port 3001)**
```bash
cd web-admin
yarn dev
```

**Web Public (Port 3002)**
```bash
cd web-public
yarn dev
```

## 📚 Features

- **Telemedicine**: Video calls and chat integration.
- **E-commerce**: Pharmacy and medical supplies.
- **CMS**: Health blogs and community forums.
- **AI**: Symptom checker and intelligent search.
- **Gamification**: Loyalty points and rewards.
- **Admin**: Comprehensive dashboard for doctors, clinics, and system admins.

## 🛡 Security & Reliability

- **Security**: Helmet headers, Rate Limiting, JWT Auth.
- **Reliability**: Global Error Handling, Circuit Breakers, Message Queues.
- **CI/CD**: GitHub Actions for automated builds.

## 📄 License
Private / Enterprise
