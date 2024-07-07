import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute(children) {
  let location = useLocation();

  if (false) {// not authenticated 
    return <Navigate to='../pages/login.js' state={{from:location}} replace />
  }
  return children;
}