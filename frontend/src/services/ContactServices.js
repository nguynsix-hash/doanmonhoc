// src/services/ContactServices.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/contacts";

// ===== JWT Helper =====
const getToken = () => localStorage.getItem("token");
const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});

const ContactServices = {
  // Lấy tất cả contact (admin)
  getAllContacts: async () => {
    const res = await axios.get(API_URL, { headers: authHeader() });
    return res.data;
  },

  // Lấy contact theo id (admin)
  getContactById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    return res.data;
  },

  // Tạo contact mới (public)
  createContact: async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  },

  // Cập nhật toàn bộ contact (admin)
  updateContact: async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });
    return res.data;
  },

  // Chỉ cập nhật status contact (admin)
  updateStatus: async (id, status) => {
    const res = await axios.put(
      `${API_URL}/${id}/status`,
      null,
      { params: { status }, headers: authHeader() }
    );
    return res.data;
  },

  // Xóa contact (admin)
  deleteContact: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    return res.data;
  },
};

export default ContactServices;
