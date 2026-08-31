# Mobile Partner - Hướng dẫn Setup và Chạy

## ✅ Đã hoàn thành

1. **Clone project** từ `healthcare_grab/mobile` → `mobile-partner`
2. **Cấu hình API**:
   - `baseUrl.js`: `http://localhost:3000` (API Gateway)
   - `Login.js`: Endpoint `/auth/register` và `/auth/login`
3. **Dependencies**: Đã cài đặt npm packages
4. **React Native CLI**: Đã thêm vào devDependencies

## 🚀 Cách chạy

### Option 1: iOS Simulator
```bash
# Mở iOS Simulator trước
open -a Simulator

# Sau đó chạy app
cd mobile-partner
npx react-native@latest run-ios

# Hoặc chỉ định simulator cụ thể
npx react-native@latest run-ios --simulator="iPhone 15"
```

### Option 2: Android Emulator
```bash
cd mobile-partner  
npx react-native@latest run-android
```

### Option 3: Metro Bundler riêng
```bash
# Terminal 1: Start Metro
npm start

# Terminal 2: Run app
npm run ios
# hoặc
npm run android
```

## 📱 Test Authentication

**Tài khoản test:**
- Email: `minh@yahoo.com`
- Password: `123456@aA`

**Hoặc tạo tài khoản mới** qua nút "Sign Up" trong app.

## 🔧 Backend Requirements

Đảm bảo các services đang chạy:
```bash
cd backend
docker-compose up -d
```

Kiểm tra:
- API Gateway: `http://localhost:3000`
- Auth Service: Phải kết nối được với RabbitMQ
- User Service: Database `user_db` phải tồn tại

## ⚠️ Troubleshooting

### "react-native: command not found"
Sử dụng `npx`:
```bash
npx react-native@latest run-ios
```

### Network errors khi install
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### iOS Pod install
```bash
cd ios
pod install
cd ..
```

### Android Gradle issues
```bash
cd android
./gradlew clean
cd ..
```

## 📝 Lưu ý quan trọng

- App đang sử dụng React Native 0.71.7
- Cần Xcode (iOS) hoặc Android Studio (Android)
- Backend API phải chạy trước khi test app
- Kiểm tra firewall/network nếu không kết nối được API
