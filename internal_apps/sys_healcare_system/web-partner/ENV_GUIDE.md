# Web Public - Environment Variables Guide

## 📋 Overview

This document explains all environment variables needed for the Healthcare System web-public frontend.

## 🚀 Quick Start

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. The `.env.local` file is already configured for local development with sensible defaults.

3. Start the development server:
```bash
npm run dev
```

## 🔧 Environment Files

| File | Purpose | Commit to Git? |
|------|---------|----------------|
| `.env.example` | Template with all variables | ✅ Yes |
| `.env.local` | Local development | ❌ No |
| `.env.production` | Production deployment | ❌ No |
| `.env.development` | Development overrides | ❌ No |

## 📝 Required Variables

These variables **MUST** be set for the application to work:

### API Configuration
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```
- `NEXT_PUBLIC_API_URL`: Backend API Gateway URL (NestJS)
- `NEXT_PUBLIC_SOCKET_URL`: WebSocket server URL (for real-time features)

### Authentication
```env
NEXT_PUBLIC_JWT_SECRET=supersecret
```
- `NEXT_PUBLIC_JWT_SECRET`: Must match backend `JWT_SECRET` in `.env`

## 🔐 Optional Variables

### Zoom Integration (Telemedicine)
Required for video consultations:
```env
NEXT_PUBLIC_ZOOM_API_KEY=your_key
NEXT_PUBLIC_ZOOM_API_SECRET_KEY=your_secret
NEXT_PUBLIC_ZOOM_SDK_KEY=your_sdk_key
NEXT_PUBLIC_ZOOM_SDK_SECRET=your_sdk_secret
```
**How to get:**
1. Go to https://marketplace.zoom.us/
2. Create a developer account
3. Create an SDK app
4. Copy credentials

### Google Maps
Required for location features:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```
**How to get:**
1. Go to https://console.cloud.google.com/google/maps-apis
2. Create a project
3. Enable Maps JavaScript API
4. Create API key

### Analytics
```env
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```
- Google Analytics for tracking
- Google Tag Manager for marketing tags

### Payment Gateways
```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxxxx
NEXT_PUBLIC_PAYPAL_CLIENT_ID=xxxxx
```
- Stripe: https://stripe.com
- PayPal: https://developer.paypal.com

### Email Service
```env
NEXT_PUBLIC_EMAIL_SERVICE=sendgrid
NEXT_PUBLIC_EMAIL_API_KEY=your_key
```
Supported services: SendGrid, Mailgun, AWS SES

### SMS Service
```env
NEXT_PUBLIC_SMS_API_KEY=your_key
NEXT_PUBLIC_SMS_SENDER_ID=HEALTHCARE
```
Supported services: Twilio, Vonage

### Cloud Storage
```env
NEXT_PUBLIC_CDN_URL=https://cdn.yourdomain.com
NEXT_PUBLIC_S3_BUCKET=your-bucket
NEXT_PUBLIC_S3_REGION=us-east-1
```

## 🎛️ Feature Toggles

Enable/disable features without code changes:

```env
NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_TELEMEDICINE=true
NEXT_PUBLIC_ENABLE_BOOKING=true
NEXT_PUBLIC_ENABLE_ECOMMERCE=true
NEXT_PUBLIC_ENABLE_COMMUNITY=true
NEXT_PUBLIC_ENABLE_EDUCATION=true
```

## 🔒 Security Notes

1. **NEVER commit `.env.local` or `.env.production` to Git**
2. **Change JWT_SECRET in production**
3. **Use different API keys for development and production**
4. **Rotate keys regularly**
5. **Use environment-specific Zoom/Payment keys**

## 🌍 Environment-Specific Setup

### Development (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:4000
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_LOG_LEVEL=debug
```

### Production (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_LOG_LEVEL=error
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=true
```

## 📦 Usage in Code

```typescript
// Access environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const isChatEnabled = process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true';

// Always provide fallbacks
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
```

## 🐛 Troubleshooting

### API calls failing
- Check `NEXT_PUBLIC_API_URL` is correct
- Ensure backend is running: `npm run start:dev` in backend folder
- Check CORS settings in backend

### WebSocket not connecting
- Verify `NEXT_PUBLIC_SOCKET_URL`
- Check if Socket.IO server is running
- Check browser console for connection errors

### Zoom not working
- Verify all 4 Zoom keys are set
- Check Zoom SDK version compatibility
- Ensure meeting permissions are correct

### Auth not working
- Ensure `NEXT_PUBLIC_JWT_SECRET` matches backend
- Check token expiry settings
- Clear localStorage and re-login

## 📚 Related Documentation

- [Backend Setup](../backend/README.md)
- [API Documentation](/api-docs)
- [Deployment Guide](./DEPLOYMENT.md)

## 🆘 Support

For issues or questions:
1. Check this documentation
2. Review browser console for errors
3. Check backend logs
4. Contact development team
