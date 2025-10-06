import React, { createContext } from "react";  // No useState or useEffect needed
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const signup = async ({ username, email, password }) => {
    const res = await api.post("/api/auth/signup", { username, email, password });
    // No localStorage or setUser—cookie set by backend, query will refetch
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/api/auth/login", { email, password });
    // No localStorage or setUser—cookie set by backend, query will refetch
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");  // Clears cookie only
    } catch (err) {
      console.warn("Logout API failed:", err);  // Graceful; cookie might auto-expire
    }
    // No state or localStorage to clear
  };

  return (
    <AuthContext.Provider value={{ signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};