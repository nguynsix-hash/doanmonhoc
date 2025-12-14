import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

// ===== JWT Token Helper =====
const getToken = () => localStorage.getItem("token");
const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

const UserServices = {
  // ... (Giữ nguyên các hàm register, login, getAll, getById, delete, logout) ...
  
  // ===== REGISTER =====
  register: async (userDto) => {
    const formData = new FormData();
    formData.append("username", userDto.username);
    formData.append("password", userDto.password);
    formData.append("fullName", userDto.fullName || "");
    formData.append("email", userDto.email || "");
    formData.append("phone", userDto.phone || "");
    formData.append("address", userDto.address || "");
    if (userDto.role) formData.append("role", userDto.role);
    if (userDto.avatarFile) formData.append("avatarFile", userDto.avatarFile);

    const res = await axios.post(`${API_URL}/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // ===== LOGIN =====
  login: async (username, password) => {
    const res = await axios.post(`${API_URL}/login`, { username, password });
    const { token, user } = res.data;
    if (!token) throw new Error("Không nhận được token từ server");
    localStorage.setItem("token", token);
    localStorage.setItem("adminUser", JSON.stringify(user));
    return { token, user };
  },

  // ===== GET ALL USERS =====
  getAll: async () => {
    const res = await axios.get(API_URL, authHeader());
    return res.data;
  },

  // ===== GET BY ID =====
  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, authHeader());
    return res.data;
  },

  // ===== UPDATE USER (Dùng cho Admin hoặc cập nhật toàn bộ) =====
  update: async (id, userDto) => {
    const formData = new FormData();
    formData.append("fullName", userDto.fullName || "");
    formData.append("email", userDto.email || "");
    formData.append("phone", userDto.phone || "");
    formData.append("address", userDto.address || "");
    formData.append("role", userDto.role || "USER");
    if (userDto.password) formData.append("password", userDto.password);
    if (userDto.avatarFile) formData.append("avatarFile", userDto.avatarFile);

    const token = localStorage.getItem("token");

    const res = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },
  
  // 🆕 Hàm 1: CẬP NHẬT HỒ SƠ CÁ NHÂN (PROFILE EDIT)
  // Tái sử dụng logic của hàm update, nhưng chỉ gửi các trường cần thiết.
  // API vẫn là PUT /api/users/{id}
  updateProfile: async (id, profileData) => {
    const formData = new FormData();
    formData.append("fullName", profileData.fullName || "");
    formData.append("phone", profileData.phone || "");
    formData.append("address", profileData.address || "");

    // Lưu ý: Không gửi email, username, role hoặc password ở đây. 
    // Nếu bạn muốn người dùng tự cập nhật avatar, bạn cần thêm logic đó.
    // Dựa trên ProfileEdit.jsx, chúng ta chỉ cần 3 trường này.

    const token = localStorage.getItem("token");

    const res = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    
    // Server phải trả về thông tin user đã cập nhật
    return res.data; 
  },

  // 🆕 Hàm 2: ĐỔI MẬT KHẨU
  // Giả định API Backend của bạn có endpoint chuyên biệt cho việc đổi mật khẩu 
  // (Ví dụ: PUT /api/users/change-password/{id} hoặc POST/PUT /api/users/{id}/password)
  // Nếu API không có endpoint riêng, bạn phải sử dụng hàm 'update' và gửi kèm mật khẩu mới.
  // ⚠️ Tôi giả định có endpoint chuyên biệt để tăng tính bảo mật.
  changePassword: async (id, { oldPassword, newPassword }) => {
    // Nếu API backend của bạn có endpoint chuyên biệt:
    try {
        const res = await axios.put(`${API_URL}/change-password/${id}`, 
            { oldPassword, newPassword }, 
            authHeader() // Gửi token
        );
        return res.data;
    } catch (error) {
        // Nếu endpoint chuyên biệt không tồn tại, bạn cần hỏi backend về endpoint chính xác.
        // Tạm thời ném lỗi để component ChangePassword biết lỗi gì xảy ra.
        throw error;
    }
  },
  
  // ===== DELETE =====
  delete: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, authHeader());
    return res.data;
  },
  
  // ===== LOGOUT =====
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");
  },
};

export default UserServices;