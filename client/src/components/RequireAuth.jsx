import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/*
  Wrap protected routes:
  <Route path="/dashboard" element={<RequireAuth roles={['customer']}><CustomerDashboard /></RequireAuth>} />
*/
export default function RequireAuth({ children, roles }) {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600 font-semibold">Checking access...</div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(role)) {
    // Redirect unauthorized users (e.g., customer hitting admin page)
    return <Navigate to={role === 'admin' ? '/admin/analytics' : '/'} replace />;
  }

  return children;
}
