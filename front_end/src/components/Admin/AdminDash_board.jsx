import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sider from "./Sider";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Settings from "./Settings";
import Reports from "./Reports";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.Auth);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/AdminDash_board/dashboard" replace />;
  }

  return children;
};

const AdminDash_board = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.Auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <Sider />
      <div className="flex-1 ml-[42px] p-4">
        <Routes>
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Pharma', 'doctor']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Users />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Pharma']}>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Pharma', 'doctor']}>
                <Reports />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/AdminDash_board/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDash_board; 