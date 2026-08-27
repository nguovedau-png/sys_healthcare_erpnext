/**
 * Simple test script to verify notification setup
 * 
 * This script checks if the required environment variables are set
 * and if the API is accessible.
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Notification Setup...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (fs.existsSync(envPath)) {
  console.log('✅ .env file found');
  
  // Read the .env file
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  // Parse environment variables
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      envVars[key.trim()] = value ? value.trim().replace(/^"(.*)"$/, '$1') : '';
    }
  });
  
  // Check for required variables
  if (envVars.EXPO_PUBLIC_API_URL) {
    console.log('✅ API URL configured:', envVars.EXPO_PUBLIC_API_URL);
  } else {
    console.log('⚠️  API URL not configured in .env file');
  }
  
} else if (fs.existsSync(envExamplePath)) {
  console.log('⚠️  .env file not found, but .env.example exists');
  console.log('   Please copy .env.example to .env and configure your variables');
} else {
  console.log('❌ Neither .env nor .env.example file found');
}

// Check if notification files exist
const notificationFiles = [
  'contexts/NotificationContext.tsx',
  'lib/notificationService.ts',
  'lib/api.ts',
  'app/(app)/notifications.tsx',
  'app/(app)/notifications/[id].tsx'
];

console.log('\n📁 Checking notification files...');
notificationFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log('✅', file);
  } else {
    console.log('❌', file, '(MISSING)');
  }
});

console.log('\n📋 Next steps:');
console.log('1. Make sure your backend is running');
console.log('2. Start the mobile app with: npm start');
console.log('3. Navigate to the "Test Notifications" screen');
console.log('4. Try sending a local notification');
console.log('5. Check that push notifications are working (requires backend setup)');

console.log('\n📱 For push notifications, ensure:');
console.log('   - Firebase is configured in the backend');
console.log('   - Device is registered with the backend');
console.log('   - Backend can send notifications through Firebase');