import React, { createContext } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const signup = async ({ username, email, password }) => {
    const res = await api.post("/api/auth/signup", { username, email, password });
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/api/auth/login", { email, password });
    return res.data;
  };

  const googleLogin = async (token) => {
    const res = await api.post("/api/auth/google", { token });
    return res.data;
  };

  const logout = async () => {
    try {await api.post("/api/auth/logout");}
    catch (err) {console.warn("Logout API failed:", err);}
  };

  return (
    <AuthContext.Provider value={{ signup, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};