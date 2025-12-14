import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const ProductService = {
  getAll: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },

  create: async (formData) => {
    const res = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  update: async (id, formData) => {
    const res = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  },
  // Lấy sản phẩm với filter category/brand/search
  filter: async ({ categoryId, brandId, search }) => {
    const params = {};
    if (categoryId) params.categoryId = categoryId;
    if (brandId) params.brandId = brandId;
    if (search) params.search = search;

    const res = await axios.get(`${API_URL}/filter`, { params });
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  remove: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
};

export default ProductService;
