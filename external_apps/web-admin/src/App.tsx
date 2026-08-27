import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './modules/auth/pages/Login';
import TwoFactorVerify from './modules/auth/pages/TwoFactorVerify';
import ForgotPassword from './modules/auth/pages/ForgotPassword';
import ResetPassword from './modules/auth/pages/ResetPassword';
import Register from './modules/auth/pages/Register';
import Dashboard from './modules/dashboard/pages/Dashboard';
import Users from './modules/user/pages/Users';
import Departments from './modules/department/pages/Departments';
import Employees from './modules/employee/pages/Employees';
import EmployeeDetail from './modules/employee/pages/EmployeeDetail';
import Profile from './modules/user/pages/Profile';
import Chat from './modules/chat/pages/Chat';
import Roles from './modules/user/pages/Roles';
import AuditLogs from './modules/system/pages/AuditLogs';
import CacheManager from './modules/system/pages/CacheManager';
import Settings from './modules/system/pages/Settings';
import Jobs from './modules/system/pages/Jobs';
import MediaManager from './modules/media/pages/MediaManager';
import WebhookManager from './modules/system/pages/WebhookManager';
import OidcClientManager from './modules/system/pages/OidcClientManager';
import SystemStatus from './modules/system/pages/SystemStatus';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return !isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
          <Route path="/2fa-verify" element={<TwoFactorVerify />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/cache" element={<CacheManager />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/media" element={<MediaManager />} />
          <Route path="/webhooks" element={<WebhookManager />} />
          <Route path="/oidc-clients" element={<OidcClientManager />} />
          <Route path="/system/status" element={<SystemStatus />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add more routes here */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
