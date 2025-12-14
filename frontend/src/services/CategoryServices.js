import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";

const CategoryService = {
  // ✅ Lấy tất cả danh mục
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách danh mục:", error);
      throw error;
    }
  },

  // ✅ Lấy chi tiết danh mục theo ID
  getById: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.error(`❌ Lỗi khi lấy danh mục ID ${id}:`, error);
      throw error;
    }
  },

  // ✅ Thêm danh mục mới
  add: async (category) => {
    try {
      const res = await axios.post(API_URL, category);
      return res.data;
    } catch (error) {
      console.error("❌ Lỗi khi thêm danh mục:", error);
      throw error;
    }
  },

  // ✅ Cập nhật danh mục
update: async (id, category) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, {
      name: category.name,
      description: category.description,
    });
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật danh mục:", error);
    throw error;
  }
},

  // ✅ Xóa danh mục
  remove: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.error("❌ Lỗi khi xóa danh mục:", error);
      throw error;
    }
  },
};

export default CategoryService;
