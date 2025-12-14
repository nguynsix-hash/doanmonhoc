import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserServices from "../../../services/UserServices";

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setMessage("Vui lòng nhập đủ username và password!");
      return;
    }

    try {
      // gọi API login
      const { token, user } = await UserServices.login(
        formData.username,
        formData.password
      );

      console.log("Login success:", user);

      // lưu profile vào localStorage
      localStorage.setItem("user", JSON.stringify(user));
      

      // redirect dựa theo role
      if (user.role === "admin") {
        alert("Đăng nhập admin thành công");
        navigate("/admin");
      } else {
        alert("Đăng nhập thành công");
        navigate("/thong-tin"); // customer vào trang thông tin
      }
    } catch (err) {
      console.error("Lỗi login:", err);
      setMessage(
        err.response?.data?.message || "Tên đăng nhập hoặc mật khẩu không đúng"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
      {message && <p className="text-red-600 mb-2">{message}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          placeholder="Username"
          required
          className="w-full border px-3 py-2 rounded"
          type="text"
          value={formData.username}
          name="username"
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
