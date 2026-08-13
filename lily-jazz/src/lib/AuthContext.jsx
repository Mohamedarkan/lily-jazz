// @ts-nocheck
/* eslint-disable react/prop-types */
import React, { createContext, useContext } from "react";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: null, isAuthenticated: false, logout: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);