import axios from "axios";

// Base URL එක හදාගන්නවා
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1", // ඔයාගේ backend port එක 8080 නම්
});

// Request Interceptor එක
api.interceptors.request.use(
  (config) => {
    // Local storage එකෙන් token එක ගන්නවා (Next.js වල window object එක check කරන්න ඕන)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // Token එක තියෙනව නම් 'Authorization: Bearer <token>' විදියට header එකට set කරනවා
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
