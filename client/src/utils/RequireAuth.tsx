import React from 'react';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const token = localStorage.getItem('id_token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default RequireAuth;