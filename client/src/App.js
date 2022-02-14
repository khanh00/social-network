import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  Error,
  Friends,
  Groups,
  Home,
  Login,
  Messages,
  Profile,
  Settings,
} from './pages';
import { AuthProvider } from './contexts/authContext';
import RequireAuth from './components/RequireAuth';
import { SocketProvider } from './contexts/socketContext';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/error" element={<Error />} />

            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profiles/:id" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
