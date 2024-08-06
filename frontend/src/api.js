import axios from "axios";
import { ACCESS_TOKEN } from "./constant";
const apiUrl = "https://13cc055e-b3fe-49fc-8564-7bd134165757-dev.e1-us-cdp-2.choreoapis.dev/djangonoteapp/backend/v1";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api