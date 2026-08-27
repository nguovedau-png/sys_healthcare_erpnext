# Mobile Notification System

This document explains how the notification system works in the mobile app.

## Overview

The mobile app implements both local and push notifications:

1. **Local Notifications**: Generated directly on the device
2. **Push Notifications**: Sent from the backend server through Firebase Cloud Messaging (FCM)

## Architecture

```
Mobile App ←→ Backend API ←→ Firebase Cloud Messaging ←→ Mobile Device
```

## Components

### 1. Notification Service (`lib/notificationService.ts`)

Handles all notification operations:
- Registration for push notifications
- Receiving and storing notifications
- Managing notification state (read/unread)
- Scheduling local notifications

### 2. Notification Context (`contexts/NotificationContext.tsx`)

Provides notification state and actions to all components:
- Current notifications list
- Unread count
- Push token
- Registration and management functions

### 3. Notification Screens

- `app/(app)/notifications.tsx`: Main notification list
- `app/(app)/notifications/[id].tsx`: Notification detail view
- `app/(app)/test-notifications.tsx`: Testing interface

### 4. Backend API

- Device registration endpoint: `/api/notifications/devices/register`
- User notifications endpoint: `/api/notifications/user`
- Send notification endpoints: `/api/notifications/send`, `/api/notifications/send-to-topic`

## Setup

### Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com/
2. Download the service account key JSON file
3. Place it in the backend at `config/firebase-service-account.json` or set as environment variable
4. Configure the mobile app with Firebase client credentials in `.env`

### Environment Variables

Create a `.env` file in the mobile app root:

```
EXPO_PUBLIC_API_URL=http://your-backend-ip:1337
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

## Usage

### Receiving Notifications

The app automatically registers for push notifications when a user logs in. The device token is sent to the backend for future push notifications.

### Sending Local Notifications

Use the `notificationService.scheduleLocalNotification()` method:

```typescript
import { notificationService } from '../lib/notificationService';

await notificationService.scheduleLocalNotification(
  'Title',
  'Body',
  { screen: '/profile' } // Optional data
);
```

### Handling Notification Data

Notifications can include custom data that triggers specific actions:

```json
{
  "title": "New Message",
  "body": "You have a new message",
  "data": {
    "screen": "/messages/123",
    "type": "message"
  }
}
```

When a user taps on this notification, they will be navigated to `/messages/123`.

## Testing

Use the test notifications screen (`/test-notifications`) to:
- Send local notifications
- View device push token
- Test notification handling

## Backend Integration

The backend uses Firebase Admin SDK to send push notifications:

1. Device registers with backend, providing push token
2. Backend stores device information
3. When notifications need to be sent, backend uses Firebase Admin SDK
4. Firebase delivers notification to device
5. Mobile app receives notification through Expo Notifications API

## Security

- Device tokens are associated with user accounts
- Only authenticated users can register devices
- Notification preferences are stored per device