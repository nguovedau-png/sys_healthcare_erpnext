import type { AppJSONConfig } from 'expo/config'

const IS_GITHUB_PAGES = process.env.GITHUB_PAGES === 'true'
const REPO_NAME =
  process.env.GITHUB_REPOSITORY?.split('/')[1] || 'cross-platform-client-tamagui'

export default {
  expo: {
    name: 'cross-platform-client-tamagui',
    slug: 'cross-platform-client-tamagui',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymous.cross-platform-client-tamagui',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.anonymous.cross_platform_client_tamagui',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-font',
      [
        'expo-notifications',
        {
          icon: './assets/images/notification-icon.png',
          color: '#ffffff',
          sounds: ['./assets/sounds/notification.wav'],
        },
      ],
      [
        'expo-build-properties',
        {
          ios: {
            newArchEnabled: true,
          },
          android: {
            newArchEnabled: true,
          },
        },
      ],
      'expo-web-browser',
    ],
    experiments: {
      typedRoutes: true,
      baseUrl: IS_GITHUB_PAGES ? `/${REPO_NAME}/` : undefined,
    },
  },
} satisfies AppJSONConfig
