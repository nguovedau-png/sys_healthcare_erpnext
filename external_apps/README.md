# HD Template Project (Node.js + React + Expo)

This is a complete full-stack solution including a Backend API, Web Admin Dashboard, and Mobile App.

## 📂 Project Structure

- **backend/**: Express.js + TypeScript + Prisma + PostgreSQL
- **web-admin/**: Vite + React + TypeScript + Ant Design
- **mobile-app/**: Expo + TypeScript + Gluestack UI

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- Docker & Docker Compose
- Expo Go (for mobile testing)

### 1. Setup Backend
```bash
cd backend
cp .env.example .env
npm install
docker-compose up -d  # Start Postgres & Redis
npx prisma migrate dev
npm run seed  # Seed admin user
npm run dev
```
**API URL**: `http://localhost:3000`
**Swagger Docs**: `http://localhost:3000/api-docs`

### 2. Setup Web Admin
```bash
cd web-admin
npm install
npm run dev
```
**URL**: `http://localhost:3001`

### 3. Setup Mobile App
```bash
cd mobile-app
npm install
npx expo start
```
**Scan the QR code with Expo Go app.**

## 🔑 Default Credentials
- **Admin Email**: `admin@example.com`
- **Password**: `password123`

## ⚖️ Load Balancing & Scaling (Production)

To handle high traffic, you can deploy multiple backend instances behind an Nginx Load Balancer.

### Architecture
- **Nginx**: Listens on port `3000` (Host) and acts as the entry point. It uses `ip_hash` to ensure sticky sessions for Socket.IO.
- **Backend Replicas**: Multiple instances of the Node.js API running internally. Nginx distributes traffic among them.
- **Redis**: Handles synchronization of Socket.IO events (Pub/Sub) across all backend instances.
- **Worker**: BullMQ automatically handles job distribution across available backend replicas (Competing Consumers).

### How to Scale
Run the following command to start the stack with **3 backend replicas**:

```bash
docker-compose -f docker-compose.prod.yml up -d --scale backend=3 --build
```

You can verify the replicas are running:
```bash
docker ps | grep backend
```

## 🛠 Code Generation (Scaffolding)

The project includes a CLI tool to automatically generate CRUD code and configure permissions.

### Workflow

1.  **Define Model**: Add your model to `backend/prisma/schema.prisma` (e.g., `model Demo { ... }`).
2.  **Generate Code**:
    ```bash
    # From project root
    npm run gencode Demo
    ```
    *   This generates Controller, Routes, Web Page, and Mobile Screen.
    *   It also automatically adds `'demo'` to `backend/prisma/seed.ts`.
3.  **Apply Permissions**:
    ```bash
    # From project root or backend directory
    cd backend
    npm run seed
    ```
    *   This inserts the new `demo.create`, `demo.read`, etc. permissions into the database so the API works.
4.  **Register Routes**:
    *   **Backend**: Import and use route in `backend/src/index.ts`.
    *   **Web**: Import page in `web-admin/src/routes.tsx`.
    *   **Mobile**: Add screen to `mobile-app/src/navigation/AppNavigator.tsx`.
5.  **Restart**: Restart backend server to apply changes.



