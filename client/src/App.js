import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import { Home, Login } from './pages';
import { AuthProvider } from './contexts/authContext';
import { SocketProvider } from './contexts/socketContext';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
