import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RoleChecker = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.Auth || {});
  
  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user's role is not in allowed roles, redirect to unauthorized
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If user is authorized, render children
  return children;
};

export default RoleChecker; 