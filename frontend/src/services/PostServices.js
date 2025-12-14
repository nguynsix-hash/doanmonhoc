// src/services/PostServices.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/posts";

// ===== JWT helper =====
const getToken = () => localStorage.getItem("token");
const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});

const PostServices = {
  // Lấy tất cả posts
  getAllPosts: async () => {
    const res = await axios.get(API_URL, { headers: authHeader() });
    return res.data;
  },

  // Lấy post theo id
  getPostById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    return res.data;
  },

  // Tạo post mới (upload ảnh optional)
  createPost: async (postData, file) => {
    const formData = new FormData();
    formData.append("post", new Blob([JSON.stringify(postData)], { type: "application/json" }));
    if (file) formData.append("file", file);

    const res = await axios.post(API_URL, formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Cập nhật post (upload ảnh optional)
  updatePost: async (id, postData, file) => {
    const formData = new FormData();
    formData.append("post", new Blob([JSON.stringify(postData)], { type: "application/json" }));
    if (file) formData.append("file", file);

    const res = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Xóa post
  deletePost: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    return res.data;
  },
};

export default PostServices;
