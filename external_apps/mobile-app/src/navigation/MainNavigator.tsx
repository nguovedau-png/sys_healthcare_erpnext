import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, User, Briefcase, Building2, MessageCircle, Settings, Bell } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { PERMISSIONS, hasPermission, isAdmin, getUserPermissions } from '../utils/permissions';
import HomeScreen from '../modules/core/screens/HomeScreen';
import WebViewScreen from '../modules/core/screens/WebViewScreen';
import ProfileScreen from '../modules/core/screens/ProfileScreen';
import ChangePasswordScreen from '../modules/core/screens/ChangePasswordScreen';
import TwoFactorSetupScreen from '../modules/auth/screens/TwoFactorSetupScreen';
import RolesScreen from '../modules/core/screens/RolesScreen';
import JobsScreen from '../modules/core/screens/JobsScreen';
import SettingsScreen from '../modules/core/screens/SettingsScreen';
import CacheManagerScreen from '../modules/system/screens/CacheManagerScreen';
import MediaScreen from '../modules/media/screens/MediaScreen';
import WebhookScreen from '../modules/system/screens/WebhookScreen';
import { usePushNotifications } from '../hooks/usePushNotifications';
import OidcClientScreen from '../modules/system/screens/OidcClientScreen';

// Core Screens
import AuditLogsScreen from '../modules/core/screens/AuditLogsScreen';
import NotificationListScreen from '../modules/core/screens/NotificationListScreen';

// Other Screens for Stacks
import EmployeeListScreen from '../modules/employee/screens/EmployeeListScreen';
import DepartmentListScreen from '../modules/department/screens/DepartmentListScreen';
import ChatListScreen from '../modules/chat/screens/ChatListScreen';
import ChatScreen from '../modules/chat/screens/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder Stacks
const EmployeeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="EmployeeList" component={EmployeeListScreen} options={{ title: 'Employees' }} />
    </Stack.Navigator>
);

const DepartmentStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="DepartmentList" component={DepartmentListScreen} options={{ title: 'Departments' }} />
    </Stack.Navigator>
);

const ChatStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Chat' }} />
    </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
        <Stack.Screen name="TwoFactorSetup" component={TwoFactorSetupScreen} options={{ title: '2FA Setup' }} />
    </Stack.Navigator>
);

// Settings Stack
const SettingsStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Roles" component={RolesScreen} options={{ title: 'Roles & Permissions' }} />
        <Stack.Screen name="AuditLogs" component={AuditLogsScreen} options={{ title: 'Audit Logs' }} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="CacheManager" component={CacheManagerScreen} />
        <Stack.Screen name="Jobs" component={JobsScreen} options={{ title: 'System Jobs' }} />
        <Stack.Screen name="Media" component={MediaScreen} options={{ title: 'Media Manager' }} />
        <Stack.Screen name="Webhooks" component={WebhookScreen} options={{ title: 'System Webhooks' }} />
        <Stack.Screen name="OidcClients" component={OidcClientScreen} options={{ title: 'OAuth Apps' }} />
        <Stack.Screen name="Notifications" component={NotificationListScreen} options={{ title: 'Notifications' }} />
    </Stack.Navigator>
);

const MainNavigator = () => {
    const { isAuthenticated, is2FAVerified, requires2FA } = useSelector((state: any) => state.auth);
    usePushNotifications(); // Initialize Push Notifications
    const { user } = useSelector((state: RootState) => state.auth);
    const userPermissions = getUserPermissions(user);
    const userRole = user?.role?.name || user?.role || '';

    // Define all possible tabs with permission requirements
    const allTabs = [
        {
            name: 'Home',
            component: WebViewScreen,
            icon: Home,
            permission: null, // Always visible
        },
        {
            name: 'Employees',
            component: EmployeeStack,
            icon: Briefcase,
            permission: PERMISSIONS.VIEW_EMPLOYEES,
            headerShown: false,
        },
        {
            name: 'Departments',
            component: DepartmentStack,
            icon: Building2,
            permission: PERMISSIONS.VIEW_DEPARTMENTS,
            headerShown: false,
        },
        {
            name: 'Chat',
            component: ChatStack,
            icon: MessageCircle,
            permission: PERMISSIONS.VIEW_CHAT,
            headerShown: false,
        },
        {
            name: 'Profile',
            component: ProfileStack,
            icon: User,
            permission: null, // Always visible
            headerShown: false,
        },
        {
            name: 'Settings',
            component: SettingsStack,
            icon: Settings,
            permission: PERMISSIONS.VIEW_SETTINGS,
            headerShown: false,
        },
    ];

    // Filter tabs based on permissions
    const visibleTabs = useMemo(() => {
        // Admin sees everything
        if (isAdmin(userRole)) {
            return allTabs;
        }

        // Filter based on permissions
        return allTabs.filter(tab => {
            // Tabs without permission requirement are always visible
            if (!tab.permission) return true;
            // Check if user has the required permission
            return hasPermission(userPermissions, tab.permission);
        });
    }, [userPermissions, userRole]);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            {visibleTabs.map((tab) => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        headerShown: tab.headerShown !== undefined ? tab.headerShown : true,
                        tabBarIcon: ({ color, size }) => <tab.icon color={color} size={size} />
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default MainNavigator;
