import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://altaif-app.onrender.com";
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true  // ADD: Send cookies with requests
});

export default api;