'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Exclude login/auth pages from protection
  const isAuthPage = pathname?.startsWith('/auth');

  // Determine redirect URL based on current path
  const getDefaultRedirectUrl = () => {
    return '/auth/login';
  };

  const redirectUrl = getDefaultRedirectUrl();

  useEffect(() => {
    if (!loading && !isAuthenticated && !isAuthPage) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, loading, router, redirectUrl, isAuthPage]);

  if (loading && !isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated && !isAuthPage) {
    return null;
  }

  return <>{children}</>;
}