// Permission checking utilities
export const PERMISSIONS = {
    // Dashboard
    VIEW_DASHBOARD: 'view_dashboard',

    // Users
    VIEW_USERS: 'view_users',
    CREATE_USER: 'create_user',
    EDIT_USER: 'edit_user',
    DELETE_USER: 'delete_user',

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
    CREATE_ROLE: 'create_role',
    EDIT_ROLE: 'edit_role',
    DELETE_ROLE: 'delete_role',
    MANAGE_ROLES: 'manage_roles', // Full role management

    // Audit Logs
    VIEW_AUDIT_LOGS: 'view_audit_logs',

    // Settings
    VIEW_SETTINGS: 'view_settings',
    MANAGE_SETTINGS: 'manage_settings',

    // Chat
    VIEW_CHAT: 'view_chat',
    CREATE_CHANNEL: 'create_channel',

    // Notifications
    VIEW_NOTIFICATIONS: 'view_notifications',
};

// Permission helper functions
export const hasPermission = (userPermissions: string[], requiredPermission: string): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (userPermissions: string[], requiredPermissions: string[]): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    return requiredPermissions.some(permission => userPermissions.includes(permission));
};

export const hasAllPermissions = (userPermissions: string[], requiredPermissions: string[]): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    return requiredPermissions.every(permission => userPermissions.includes(permission));
};

export const isAdmin = (userRole: string): boolean => {
    const role = userRole?.toUpperCase() || '';
    console.log(role, userRole);
    return role === 'ADMIN' || role === 'SUPER_ADMIN';
};

// Get user permissions from user object
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

// Check if user can perform CRUD operations
export const canCreate = (userPermissions: string[], entity: 'user' | 'employee' | 'department' | 'role'): boolean => {
    const permissionMap = {
        user: PERMISSIONS.CREATE_USER,
        employee: PERMISSIONS.CREATE_EMPLOYEE,
        department: PERMISSIONS.CREATE_DEPARTMENT,
        role: PERMISSIONS.CREATE_ROLE,
    };
    return hasPermission(userPermissions, permissionMap[entity]);
};

export const canEdit = (userPermissions: string[], entity: 'user' | 'employee' | 'department' | 'role'): boolean => {
    const permissionMap = {
        user: PERMISSIONS.EDIT_USER,
        employee: PERMISSIONS.EDIT_EMPLOYEE,
        department: PERMISSIONS.EDIT_DEPARTMENT,
        role: PERMISSIONS.EDIT_ROLE,
    };
    return hasPermission(userPermissions, permissionMap[entity]);
};

export const canDelete = (userPermissions: string[], entity: 'user' | 'employee' | 'department' | 'role'): boolean => {
    const permissionMap = {
        user: PERMISSIONS.DELETE_USER,
        employee: PERMISSIONS.DELETE_EMPLOYEE,
        department: PERMISSIONS.DELETE_DEPARTMENT,
        role: PERMISSIONS.DELETE_ROLE,
    };
    return hasPermission(userPermissions, permissionMap[entity]);
};

export const canView = (userPermissions: string[], entity: 'user' | 'employee' | 'department' | 'role'): boolean => {
    const permissionMap = {
        user: PERMISSIONS.VIEW_USERS,
        employee: PERMISSIONS.VIEW_EMPLOYEES,
        department: PERMISSIONS.VIEW_DEPARTMENTS,
        role: PERMISSIONS.VIEW_ROLES,
    };
    return hasPermission(userPermissions, permissionMap[entity]);
};

// React hook for permission checking
export const usePermissions = (user: any) => {
    const permissions = getUserPermissions(user);
    const role = user?.role?.name || user?.role || '';
    const isAdminUser = isAdmin(role);

    return {
        permissions,
        role,
        isAdmin: isAdminUser,
        hasPermission: (permission: string) => isAdminUser || hasPermission(permissions, permission),
        hasAnyPermission: (perms: string[]) => isAdminUser || hasAnyPermission(permissions, perms),
        hasAllPermissions: (perms: string[]) => isAdminUser || hasAllPermissions(permissions, perms),
        canCreate: (entity: 'user' | 'employee' | 'department' | 'role') => isAdminUser || canCreate(permissions, entity),
        canEdit: (entity: 'user' | 'employee' | 'department' | 'role') => isAdminUser || canEdit(permissions, entity),
        canDelete: (entity: 'user' | 'employee' | 'department' | 'role') => isAdminUser || canDelete(permissions, entity),
        canView: (entity: 'user' | 'employee' | 'department' | 'role') => isAdminUser || canView(permissions, entity),
    };
};
