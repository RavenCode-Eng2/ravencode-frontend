import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  console.log('[ProtectedRoute] Current state:', {
    isAuthenticated,
    hasUser: !!user,
    userRole: user?.role,
    currentPath: location.pathname,
    requireAdmin,
    isLoading
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!isAuthenticated || !user) {
    console.log('[ProtectedRoute] Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route requires admin and user is not admin, redirect to dashboard
  if (requireAdmin && user.role !== 'admin') {
    console.log('[ProtectedRoute] User is not admin, redirecting to dashboard');
    console.log('[ProtectedRoute] User role:', user.role);
    return <Navigate to="/dashboard" replace />;
  }

  console.log('[ProtectedRoute] Access granted');
  return <>{children}</>;
};

export default ProtectedRoute; 