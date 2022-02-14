import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

function SocketProvider({ children }) {
  const socket = io(process.env.REACT_APP_SERVER, { withCredentials: true });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useSocket() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };
