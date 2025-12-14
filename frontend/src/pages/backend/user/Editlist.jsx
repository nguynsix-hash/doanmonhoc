import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserServices from "../../../services/UserServices";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    role: "USER",
    password: "",
    avatar: "",
    avatarFile: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await UserServices.getById(id);
        setUser({ ...data, password: "" });
      } catch (err) {
        alert("❌ Không tìm thấy user!");
        navigate("/admin/user");
      }
    };
    loadUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUser({ ...user, avatarFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserServices.update(id, user);
      alert("✅ Cập nhật thành công!");
      navigate("/admin/user");
    } catch (err) {
      alert("❌ Lỗi khi cập nhật!");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        ✏️ Chỉnh sửa người dùng
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Username</label>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Họ tên</label>
          <input
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Số điện thoại</label>
          <input
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Địa chỉ</label>
          <input
            name="address"
            value={user.address || ""}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Ảnh đại diện</label>
          {user.avatar && (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
          )}
          <input type="file" onChange={handleFileChange} />
        </div>

        <div>
          <label className="block font-semibold">Mật khẩu (để trống nếu không đổi)</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Quyền</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default UserEdit;
