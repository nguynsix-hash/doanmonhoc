import axios from "axios";
import { API_URL } from "./config";

// ✅ Tạo instance axios chung
const httpAxios = axios.create({
  baseURL: API_URL, // ví dụ: http://localhost:8080/api
  // timeout: 5000, // (tùy chọn)
});

// ✅ Interceptor xử lý response
httpAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default httpAxios;
