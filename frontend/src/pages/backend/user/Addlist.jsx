import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserServices from "../../../services/UserServices";

function AddUser() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "USER",
    avatarFile: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatarFile") {
      setFormData({ ...formData, avatarFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // gọi API thêm user
      const res = await UserServices.register(formData);
      alert("✅ Thêm người dùng thành công!");
      navigate("/admin/user");
    } catch (err) {
      console.error("❌ Lỗi thêm user:", err);
      const msg =
        err.response?.data
          ? typeof err.response.data === "string"
            ? err.response.data
            : JSON.stringify(err.response.data)
          : "Lỗi kết nối hoặc dữ liệu không hợp lệ!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          ➕ Thêm người dùng mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên đăng nhập */}
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Họ và tên */}
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Mật khẩu */}
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Số điện thoại */}
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Địa chỉ */}
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Vai trò */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          {/* Avatar */}
          <input
            type="file"
            name="avatarFile"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />

          {/* Nút submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Đang xử lý..." : "Thêm người dùng"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mt-4 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}

export default AddUser;
