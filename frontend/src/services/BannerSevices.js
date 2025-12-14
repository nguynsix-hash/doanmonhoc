import axios from "axios";

const API_URL = "http://localhost:8080/api/banners";

// ===== JWT Helper =====
const getToken = () => localStorage.getItem("token");
const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// ===== GET tất cả banner (public) =====
export const getAllBanners = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// ===== GET banner theo id (public) =====
export const getBannerById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// ===== POST tạo banner (ADMIN) =====
export const createBanner = async (banner, file) => {
  const formData = new FormData();
  formData.append("banner", new Blob([JSON.stringify(banner)], { type: "application/json" }));
  if (file) formData.append("file", file);

  const res = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeader(),
    },
  });

  return res.data;
};

// ===== PUT cập nhật banner (ADMIN) =====
export const updateBanner = async (id, banner, file) => {
  const formData = new FormData();
  formData.append("banner", new Blob([JSON.stringify(banner)], { type: "application/json" }));
  if (file) formData.append("file", file);

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeader(),
    },
  });

  return res.data;
};

// ===== DELETE banner (ADMIN) =====
export const deleteBanner = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};

export default {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
};
