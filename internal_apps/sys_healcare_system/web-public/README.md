# Healthcare System - Web Public Frontend

Modern healthcare platform frontend built with Next.js 15, React 19, TypeScript, and Ant Design.

## 🚀 Quick Start

### Automated Setup (Recommended)

```bash
npm run setup
```

This will:
- ✅ Check Node.js version
- ✅ Create `.env.local` from template
- ✅ Install dependencies
- ✅ Verify backend connectivity
- ✅ Show next steps

### Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup environment (if not exists)
cp .env.example .env.local

# 3. Start development server
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## 📋 Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Backend API** running on port 3000

## 🔧 Environment Variables

### Required Variables

Create `.env.local` with these minimum settings:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_JWT_SECRET=supersecret
```

### All Available Variables

See [ENV_GUIDE.md](./ENV_GUIDE.md) for complete documentation of all environment variables.

**Key Variables:**
- `NEXT_PUBLIC_API_URL` - Backend API Gateway URL
- `NEXT_PUBLIC_SOCKET_URL` - WebSocket server URL
- `NEXT_PUBLIC_ZOOM_API_KEY` - Zoom integration (telemedicine)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` - Stripe payments
- Feature toggles: `NEXT_PUBLIC_ENABLE_*`

## 📁 Project Structure

```
web-public/
├── app/                    # Next.js App Router
│   ├── (site)/            # Public pages
│   │   ├── auth/          # Login, Register
│   │   ├── booking/       # Appointment booking
│   │   ├── chat/          # Real-time chat
│   │   ├── education/     # Courses & lessons
│   │   ├── profile/       # User profile
│   │   └── ...            # Other features
│   └── portal/            # Admin/Partner portal
├── components/            # React components
│   ├── admin/            # Admin UI components
│   ├── common/           # Shared components
│   ├── layout/           # Layout components
│   ├── portal/           # Portal components
│   └── shop/             # E-commerce components
├── services/             # API services
│   ├── api.ts            # Base API client
│   ├── auth.service.ts   # Authentication
│   ├── booking.service.ts
│   └── ...               # Other services
├── contexts/             # React contexts
├── providers/            # Context providers
├── types/                # TypeScript types
├── locales/              # i18n translations
└── public/               # Static assets
```

## 🎯 Features

### Core Features
- ✅ **Authentication** - Login, Register, JWT tokens
- ✅ **User Profile** - Manage personal information
- ✅ **Appointment Booking** - Book doctors/hospitals
- ✅ **Real-time Chat** - Socket.IO messaging
- ✅ **Telemedicine** - Video consultations (Zoom)
- ✅ **E-commerce** - Shop for health products
- ✅ **Education** - Courses and lessons
- ✅ **Community** - Forums and discussions
- ✅ **AI Assistant** - AI-powered health assistant
- ✅ **Multi-language** - Vietnamese & English

### Portal Features (Admin/Partner)
- 📊 Dashboard & Analytics
- 👥 User Management
- 📅 Booking Management
- 💰 Finance & Reports
- 📦 Inventory Management
- 🏥 Patient Records (EMR)
- 📝 Content Management

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server (port 4000)
npm run setup        # Run setup script

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔐 Authentication

### Test Credentials (after seeding database)

```
Email: admin@gmail.com
Password: 123456
```

### How Auth Works

1. User logs in via `/login`
2. Backend validates and returns JWT token
3. Token stored in `localStorage`
4. All API requests include token in `Authorization` header
5. Token auto-refreshes on 401 errors

## 🌐 API Integration

### Backend Services

| Service | Port | Purpose |
|---------|------|---------|
| API Gateway | 3000 | Main REST API |
| Socket.IO | 3001 | Real-time features |
| User Service | 3006 | User management (RabbitMQ) |
| Auth Service | 3007 | Authentication (RabbitMQ) |

### API Rewrites

Next.js rewrites `/api/*` to backend automatically:

```typescript
// next.config.ts
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:3000/:path*',
    },
  ];
}
```

## 🎨 UI Framework

- **Ant Design 6** - Primary UI component library
- **Tailwind CSS 4** - Utility-first CSS
- **Bootstrap 5** - Additional components
- **ApexCharts** - Data visualization
- **Recharts** - Additional charts

## 🌍 Internationalization

Supported languages:
- 🇻🇳 Vietnamese (vi)
- 🇬🇧 English (en)

Translation files: `locales/*.json`

## 📱 PWA Support

Progressive Web App features enabled:
- Offline support
- Install to home screen
- Push notifications (coming soon)

Configured in `next.config.ts` with `next-pwa`.

## 🔒 Security

- JWT authentication
- Protected routes
- CSRF protection
- XSS prevention
- Secure HTTP headers
- Input validation

## 🐛 Debugging

### Common Issues

**API calls failing:**
```bash
# Check if backend is running
curl http://localhost:3000

# Check .env.local
cat .env.local | grep API_URL
```

**WebSocket not connecting:**
```bash
# Check Socket.IO server
curl http://localhost:3001

# Check browser console for errors
```

**Auth not working:**
```bash
# Clear localStorage
# In browser console:
localStorage.clear()

# Re-login
```

## 📚 Documentation

- [Environment Variables Guide](./ENV_GUIDE.md)
- [API Documentation](/api-docs) - When backend is running
- [Backend Setup](../backend/README.md)
- [Deployment Guide](./DEPLOYMENT.md) - Coming soon

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t healthcare-web .

# Run container
docker run -p 4000:3000 healthcare-web
```

### Traditional Server

```bash
# Build
npm run build

# Start
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Private - Healthcare System

## 🆘 Support

- 📧 Email: support@healthcare.com
- 💬 Chat: In-app support
- 📖 Docs: [ENV_GUIDE.md](./ENV_GUIDE.md)
- 🐛 Issues: GitHub Issues

## 🔄 Development Workflow

1. **Start backend first:**
   ```bash
   cd ../backend
   npm run start:dev
   ```

2. **Start frontend:**
   ```bash
   npm run dev
   ```

3. **Access application:**
   - Frontend: http://localhost:4000
   - Backend API: http://localhost:3000
   - API Docs: http://localhost:3000/api

## 🎯 Roadmap

- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Advanced AI diagnostics
- [ ] Wearable device integration
- [ ] Multi-tenant support
- [ ] Advanced analytics dashboard

---

Built with ❤️ for better healthcare
