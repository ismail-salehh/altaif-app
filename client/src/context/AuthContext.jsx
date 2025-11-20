// client/src/context/AuthContext.jsx
import React, { createContext, useEffect, useState, useCallback } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const signup = async ({ username, email, password }) => {
    const res = await api.post("/api/auth/signup", { username, email, password });
    await me(); // refresh user
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/api/auth/login", { email, password });
    await me();
    return res.data;
  };

  const googleLogin = async (token) => {
    const res = await api.post("/api/auth/google", { token });
    await me();
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
    } catch (err) {
      console.warn("Logout API failed:", err);
    }
  };

  const me = useCallback(async () => {
    try {
      setIsAuthLoading(true);
      const res = await api.get("/api/auth/me");
      setUser(res.data || null);
      setIsAuthLoading(false);
      return res.data;
    } catch (err) {
      setUser(null);
      setIsAuthLoading(false);
      return null;
    }
  }, []);

  // run once on mount
  useEffect(() => {
    me();
  }, [me]);

  return (
    <AuthContext.Provider value={{ signup, login, googleLogin, logout, me, user, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
