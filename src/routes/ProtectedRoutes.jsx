import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Me } from '../api/services/authService';

const ProtectedRoutes = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const userLoading = useAuthStore((state) => state.userLoading);

useEffect(() => {
  if (token && !user) {
    Me();
  } else {
    useAuthStore.getState().setUserLoading(false);
  }
}, [token]);


  console.log("ProtectedRoutes | user:", user);
  console.log("ProtectedRoutes | token:", token);
  console.log("ProtectedRoutes | loading:", userLoading);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (!user && !userLoading) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
