# Mobile Partner - Quick Start

## ✅ Setup Complete

App đã được cấu hình và sẵn sàng chạy!

## 🚀 Chạy App

### iOS (Recommended)
```bash
cd mobile-partner

# Tạo simulator (chỉ cần 1 lần)
xcrun simctl create "iPhone 15" com.apple.CoreSimulator.SimDeviceType.iPhone-15 com.apple.CoreSimulator.SimRuntime.iOS-18-5

# Chạy app
npx react-native@latest run-ios --simulator="iPhone 15"
```

### Android
```bash
cd mobile-partner

# Mở Android Emulator trước (từ Android Studio)
# Sau đó:
npx react-native@latest run-android
```

## 🔐 Login

**Test Account:**
- Email: `minh@yahoo.com`
- Password: `123456@aA`

## 🔧 Backend

Đảm bảo backend đang chạy:
```bash
cd backend
docker-compose up -d
```

API Gateway: `http://localhost:3000`

## 📝 Files đã cấu hình

- `baseUrl.js`: API endpoint (port 3000)
- `screens/Login.js`: Auth endpoints (/auth/login, /auth/register)
- `package.json`: React Native CLI dependencies

## 🐛 Troubleshooting

### "No simulator available"
```bash
# List simulators
xcrun simctl list devices

# Create new one
xcrun simctl create "iPhone 15" com.apple.CoreSimulator.SimDeviceType.iPhone-15 com.apple.CoreSimulator.SimRuntime.iOS-18-5
```

### Build errors
```bash
# Clean and reinstall
rm -rf node_modules ios/Pods
npm install
cd ios && pod install && cd ..
```

### Metro bundler issues
```bash
# Reset cache
npx react-native start --reset-cache
```
