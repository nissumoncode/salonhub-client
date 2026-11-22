import axios from "axios";
import { authClient } from "./auth-client";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://salonhub-server.onrender.com",
});

api.interceptors.request.use(async (config) => {
  try {
    const { data } = await authClient.token();

    if (data?.token) {
      config.headers.Authorization = `Bearer ${data.token}`;
    }
  } catch {
    // Login না থাকলে Public API Request চলবে
  }

  return config;
});

export default api;
