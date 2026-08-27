# Mobile Partner App - Setup Guide

## Cấu hình

### 1. API Configuration
File `baseUrl.js` đã được cấu hình để kết nối với API Gateway:
```javascript
const baseUrl = "http://localhost:3000";
```

### 2. Authentication
App sử dụng API Gateway (`/auth/login` và `/auth/register`) để xác thực thông qua `auth-service`.

## Cài đặt và Chạy

### Bước 1: Cài đặt dependencies
```bash
cd mobile-partner
npm install
```

### Bước 2: Chạy Metro Bundler
```bash
npm start
```

### Bước 3: Chạy trên Android
```bash
npm run android
```

### Bước 4: Chạy trên iOS
```bash
cd ios && pod install && cd ..
npm run ios
```

## Test Login

Sử dụng tài khoản test:
- Email: `minh@yahoo.com`
- Password: `123456@aA`

Hoặc tạo tài khoản mới qua chức năng Sign Up trong app.

## Lưu ý

- Backend phải chạy trên `http://localhost:3000` (API Gateway)
- `auth-service` và `user-service` phải hoạt động bình thường
- RabbitMQ phải đang chạy để các microservices giao tiếp

## Troubleshooting

### Lỗi "react-native: command not found"
Đảm bảo đã cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

### Lỗi network khi cài đặt
Nếu gặp lỗi `ECONNRESET` hoặc network issues:
```bash
# Xóa cache npm
npm cache clean --force

# Thử lại
npm install --legacy-peer-deps
```

### iOS build issues
```bash
cd ios
pod install
cd ..
npm run ios
```

### Android build issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```
