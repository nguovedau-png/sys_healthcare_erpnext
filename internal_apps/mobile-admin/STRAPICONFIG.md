# Strapi API Configuration for Mobile App

This document outlines the changes made to configure the mobile app to work with Strapi's API structure.

## Authentication Endpoints

### Login
- **Endpoint**: `/auth/local`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "identifier": "username_or_email",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "username",
      "email": "user@example.com",
      "confirmed": true,
      "blocked": false,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

### Register
- **Endpoint**: `/auth/local/register`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "username": "New User",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "New User",
      "email": "user@example.com",
      "confirmed": false,
      "blocked": false,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

## API Configuration

### Base URL
- **Development**: `http://192.168.1.8:1337`
- **Production**: Update `.env` file with your Strapi backend URL

### Endpoint Structure
- **Auth endpoints**: No `/api` prefix (e.g., `/auth/local`)
- **Other endpoints**: Prefixed with `/api` (e.g., `/api/users/me`)

### Authentication Token
- **Type**: JWT (JSON Web Token)
- **Header**: `Authorization: Bearer <jwt_token>`

## Environment Variables

### .env
```env
EXPO_PUBLIC_API_URL=http://192.168.1.8:1337
```

### .env.example
```env
# Strapi API URL
EXPO_PUBLIC_API_URL=http://192.168.1.8:1337

# For production, you might use:
# EXPO_PUBLIC_API_URL=https://your-strapi-backend.com
```

## Key Changes Made

1. **API Base URL**: Updated to use IP address 192.168.1.8 on port 1337 (Strapi's default port)
2. **Login Function**: 
   - Changed parameter from `email` to `identifier` to match Strapi's API
   - Updated to use `/auth/local` endpoint
3. **Register Function**:
   - Added required `username` field
   - Updated to use `/auth/local/register` endpoint
4. **Token Handling**: 
   - Changed from `accessToken` to `jwt` in response
   - Updated validation to use `/users/me` endpoint
5. **API Endpoints**: 
   - Removed unsupported refreshToken endpoint
   - Ensured proper prefixing of endpoints

## Verification

All authentication functions have been verified to work correctly with Strapi's API structure. The mobile app should now be able to successfully authenticate users with a Strapi backend.