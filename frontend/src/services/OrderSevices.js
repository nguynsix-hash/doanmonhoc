import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

// 🔸 Lấy token từ localStorage
const getToken = () => {
  // Có thể lưu token trong "user" hoặc trực tiếp "token"
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token || localStorage.getItem("token");
};

// 🔸 Header có Bearer token
const authHeader = () => {
  const token = getToken();
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
};

// 🔹 Lấy danh sách đơn hàng
const getAllOrders = async () => {
  const res = await axios.get(API_URL, authHeader());
  return res.data;
};

// 🔹 Lấy đơn hàng theo ID
const getOrderById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, authHeader());
  return res.data;
};

// 🔹 Thêm đơn hàng
const createOrder = async (order) => {
  const res = await axios.post(API_URL, order, authHeader());
  return res.data;
};

// 🔹 Cập nhật trạng thái đơn hàng
const updateStatus = async (id, status) => {
  const res = await axios.put(`${API_URL}/${id}/status?status=${status}`, {}, authHeader());
  return res.data;
};

// 🔹 Xóa đơn hàng
const deleteOrder = async (id) => {
  await axios.delete(`${API_URL}/${id}`, authHeader());
};

const OrderService = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateStatus,
  deleteOrder,
};

export default OrderService;
