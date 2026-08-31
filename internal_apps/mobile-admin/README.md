# Cross-Platform Client with Tamagui

A cross-platform React Native application built with Expo and Tamagui UI library, demonstrating a unified codebase that deploys to iOS, Android, and Web platforms.

## Live Demo

**[View Live Application](https://krzysu.github.io/cross-platform-client-tamagui/login)**

_Default credentials: admin / 123456_

## Initial Setup

This project was bootstrapped using:

```bash
npm create tamagui
```

I selected **"Expo Router (beta) - Expo Router starter with Tamagui set up"** over the default "Free - Expo + Next in a production ready monorepo" option because:

- No need for Next.js complexity in a mobile-first cross-platform app
- Easier to navigate project structure with Expo Router

## Tech Stack & Reasoning

**Core Framework**: React Native + Expo + Expo Router

- True cross-platform development with native performance
- File-based routing that works consistently across platforms
- Excellent developer experience and simplified deployment

**UI System**: Tamagui

- Universal components working identically on all platforms
- TypeScript-first with compile-time optimizations
- Built-in theming and responsive design

**Forms & Validation**: React Hook Form + Zod

- Industry-standard performance and developer experience
- TypeScript-first schema validation

**Authentication**: Expo SecureStore + Context API

- Secure token storage (mobile) with localStorage fallback (web)
- Simple global state management

**Code Quality**: TypeScript + Biome (over ESLint/Prettier) + GitHub Actions

- Full type safety with modern linting/formatting
- Automated CI/CD pipeline

## Project Structure

```
├── app/                  # File-based routing (Expo Router)
│   ├── (auth)/           # Authentication routes
│   ├── (app)/            # Protected app routes
│   └── _layout.tsx       # Root layout with providers
├── components/           # Reusable UI components
│   ├── forms/            # Form-specific components
│   └── ui/               # General UI components
├── contexts/             # React Context providers
├── lib/                  # Utilities and business logic
└── .github/workflows/    # CI/CD pipelines
```

## Features Implemented

- **Cross-Platform Deployment**: Web (GitHub Pages), iOS & Android not configured yet
- **Authentication**: Login/register with secure token storage and protected routes
- **Advanced Forms**: React Hook Form + Zod validation with reusable components
- **Design System**: Tamagui with theming and responsive design
- **CI/CD**: Automated deployment and code quality checks

## Strapi Backend Integration

This mobile app is configured to work with a Strapi backend. See [STRAPICONFIG.md](STRAPICONFIG.md) for detailed information about the API integration.

### Key Configuration Points:

- **API Base URL**: `http://192.168.1.8:1337` (configurable via `.env`)
- **Authentication Endpoints**: 
  - Login: `/auth/local` 
  - Register: `/auth/local/register`
- **Token Type**: JWT (JSON Web Token)
- **Token Usage**: Sent as Bearer token in Authorization header

### Environment Setup:

1. Ensure your Strapi backend is running on IP address 192.168.1.8 port 1337
2. Update `.env` file if using a different URL for your Strapi instance
3. The app will automatically connect to the Strapi backend for authentication

## How to Run the Project

### Prerequisites

- Node.js 18+
- Yarn 4.5.0+
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation & Development

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd cross-platform-client-tamagui
   yarn install
   ```

2. **Start development server:**

   ```bash
   yarn start
   ```

3. **Run in dev mode on specific platforms:**

   ```bash
   # Web development server
   yarn web

   # iOS simulator (requires Xcode)
   yarn start
   # when dev server starts, press `i` to open in iOS simulator
   ```

### Building for Production

```bash
# Build web version
yarn build:web

# Build for iOS (requires Xcode with iOS 18.5 platform support installed)
yarn ios --configuration Release

# Build for Android (requires Android Studio) <- NOT TESTED
yarn android --variant release
```

## Code Quality

The project includes comprehensive code quality tools:

```bash
# Run linting and formatting (with auto-fix)
yarn biome:dev

# Check code quality (CI mode)
yarn biome:ci

# Type checking
npx tsc --noEmit
```

## Trade-offs & Limitations

### Advantages of This Approach

1. **Single Codebase**: ~95% code sharing across platforms
2. **Developer Experience**: Excellent tooling and hot reload
3. **Performance**: Near-native performance with optimized components
4. **Maintenance**: Single codebase reduces maintenance overhead
5. **Time to Market**: Faster development and deployment cycles

### Limitations Encountered

1. **Platform-Specific Features**: Some native features require platform-specific code
2. **Bundle Size**: Web bundle larger than traditional web apps
3. **Learning Curve**: Team needs to learn React Native paradigms
4. **Debugging**: Cross-platform debugging can be more complex
5. **Third-party Libraries**: Some web libraries don't work in React Native

### Key Technical Decisions

- **Tamagui over NativeWind**: Better performance and more mature cross-platform components
- **Context API over Redux**: Sufficient complexity for auth state management
- **React Hook Form + Zod**: Best performance and developer experience for forms
- **Biome over ESLint/Prettier**: Faster, modern tooling with better defaults

## Deployment

- **Automated**: Web deploys to GitHub Pages on `main` branch pushes
- **Manual**: `yarn build:web` for other hosting providers
- **Mobile**: Needs to be prepared and tested for App Store/Google Play deployment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This implementation demonstrates a production-ready cross-platform application architecture that balances developer experience, performance, and maintainability.

# Mobile App

This is the mobile application built with Expo and Tamagui.

## Features

- User authentication
- Notification system (local and push notifications)
- Course management
- Profile management
- Settings

## Notification System

The mobile app implements a comprehensive notification system:

### Local Notifications
- Generated directly on the device
- No backend required
- Useful for reminders and local alerts

### Push Notifications
- Sent from the backend through Firebase Cloud Messaging
- Require device registration
- Delivered even when the app is not running

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Configure the API URL in `.env`:
   ```
   EXPO_PUBLIC_API_URL=http://your-backend-ip:1337
   ```

### Testing Notifications

1. Start the app:
   ```bash
   npm start
   ```

2. Navigate to the "Test Notifications" screen
3. Send a local notification to verify the system works
4. For push notifications, you'll need to:
   - Configure Firebase in the backend
   - Register your device with the backend
   - Send a notification through the backend API

### Notification Components

- `contexts/NotificationContext.tsx`: Global notification state management
- `lib/notificationService.ts`: Core notification functionality
- `lib/api.ts`: Backend API integration
- `app/(app)/notifications.tsx`: Notification list screen
- `app/(app)/notifications/[id].tsx`: Notification detail screen
- `app/(app)/test-notifications.tsx`: Notification testing interface

For detailed documentation, see [NOTIFICATIONS.md](NOTIFICATIONS.md).
