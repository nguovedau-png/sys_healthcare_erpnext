// Permission checking utilities for Mobile
export const PERMISSIONS = {
    // Users
    VIEW_USERS: 'view_users',

    // Employees
    VIEW_EMPLOYEES: 'view_employees',
    CREATE_EMPLOYEE: 'create_employee',
    EDIT_EMPLOYEE: 'edit_employee',
    DELETE_EMPLOYEE: 'delete_employee',

    // Departments
    VIEW_DEPARTMENTS: 'view_departments',
    CREATE_DEPARTMENT: 'create_department',
    EDIT_DEPARTMENT: 'edit_department',
    DELETE_DEPARTMENT: 'delete_department',

    // Roles
    VIEW_ROLES: 'view_roles',

    // Audit Logs
    VIEW_AUDIT_LOGS: 'view_audit_logs',

    // Settings
    VIEW_SETTINGS: 'view_settings',

    // Chat
    VIEW_CHAT: 'view_chat',
    CREATE_CHANNEL: 'create_channel',

    // Notifications
    VIEW_NOTIFICATIONS: 'view_notifications',
};

export const hasPermission = (userPermissions: string[], requiredPermission: string): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (userPermissions: string[], requiredPermissions: string[]): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    return requiredPermissions.some(permission => userPermissions.includes(permission));
};

export const isAdmin = (userRole: string): boolean => {
    return userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';
};

export const getUserPermissions = (user: any): string[] => {
    if (!user) return [];
    // If user has role with permissions array
    if (user.role?.permissions) {
        return user.role.permissions.map((p: any) => p.name || p);
    }
    // If permissions are directly on user
    if (user.permissions) {
        return user.permissions.map((p: any) => p.name || p);
    }
    return [];
};
