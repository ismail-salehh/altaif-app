import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://altaif-app.onrender.com";  // UPDATED: Default to full URL if not set
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true  // ADD: Send cookies with requests
});

// REMOVED: Interceptor - No longer needed (cookie handles auth)

export default api;
