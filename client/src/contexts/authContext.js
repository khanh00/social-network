import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('id'));

  const login = (id) => {
    localStorage.setItem('id', id);
    setCurrentUser(id);
  };
  const logout = () => {
    localStorage.removeItem('id');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
