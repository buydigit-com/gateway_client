import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";

const WebSocketContext = React.createContext();

const WebSocketProvider = ({ children }) => {

  const params = useParams();

  const txnHash = params.txn_hash;

  const socket = io(process.env.REACT_APP_BACKEND_API_URL, {
    path: '/ws',
    query: 'txn_hash=' + txnHash,
    rememberUpgrade: true,
    rememberTransport: true,
    transport: ['websocket']
  });
  
  const value = {
    socket,
    txnHash
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
