import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default function AppLayout() {
  const theme = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue10?.val,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="dashboard" 
        options={{ 
          title: 'Dashboard',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="notifications" 
        options={{ 
          title: 'Notifications',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="notifications/[id]" 
        options={{ 
          title: 'Notification Details',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="test-notifications" 
        options={{ 
          title: 'Test Notifications',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="courses/index" 
        options={{ 
          title: 'Courses',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="courses/[id]" 
        options={{ 
          title: 'Course Details',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="courses/chapter" 
        options={{ 
          title: 'Chapter',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="courses/video" 
        options={{ 
          title: 'Video',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="chat" 
        options={{ 
          title: 'Chat',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="chat/join" 
        options={{ 
          title: 'Join Chat',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="chat/friends" 
        options={{ 
          title: 'Online Users',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="chat/messages" 
        options={{ 
          title: 'Chat',
          headerShown: false
        }} 
      />
    </Stack>
  );
}