import axios from "axios";

const API_URL = "http://localhost:8080/api/brands";

const BrandService = {
  // Lấy tất cả brand
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err) {
      console.error("❌ Lỗi lấy danh sách brand:", err);
      throw err;
    }
  },

  // Lấy 1 brand theo id
  get: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (err) {
      console.error("❌ Lỗi lấy brand theo ID:", err);
      throw err;
    }
  },

  // Thêm brand mới (multipart/form-data)
  create: async ({ name, description, image }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (description) formData.append("description", description);
      if (image) formData.append("image", image);

      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      console.error("❌ Lỗi tạo brand:", err);
      throw err;
    }
  },

  // Cập nhật brand theo id (multipart/form-data)
  update: async (id, { name, description, image }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (description) formData.append("description", description);
      if (image) formData.append("image", image);

      const res = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      console.error("❌ Lỗi cập nhật brand:", err);
      throw err;
    }
  },

  // Xóa brand theo id
  remove: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      return res.data;
    } catch (err) {
      console.error("❌ Lỗi xóa brand:", err);
      throw err;
    }
  },
};

export default BrandService;
