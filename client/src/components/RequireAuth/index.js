import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { useSocket } from '../../contexts/socketContext';

function RequireAuth() {
  const socket = useSocket();
  let { currentUser } = useAuth();
  let location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    socket.emit('login', currentUser._id);
  }

  return <Outlet />;
}

export default RequireAuth;
