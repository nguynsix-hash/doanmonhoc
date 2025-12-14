import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import UserServices from "../../../services/UserServices";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await UserServices.getAll();
      setUsers(res || []);
    } catch (err) {
      console.error("❌ Lỗi tải danh sách user:", err);
      alert("❌ Không thể tải danh sách user. Vui lòng đăng nhập lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá user này?")) return;

    try {
      await UserServices.delete(id);
      setUsers(users.filter((u) => u.id !== id));
      alert("✅ Xoá thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi xoá user:", err);
      alert("❌ Lỗi khi xoá user!");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-indigo-700">👤 Quản lý người dùng</h2>
        <NavLink
          to="/admin/user/add"
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <FaPlus /> Thêm người dùng
        </NavLink>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Đang tải danh sách người dùng...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <tr>
                <th className="py-3 px-5 text-left">ID</th>
                <th className="py-3 px-5 text-left">Username</th>
                <th className="py-3 px-5 text-left">Họ tên</th>
                <th className="py-3 px-5 text-left">Email</th>
                <th className="py-3 px-5 text-left">Điện thoại</th>
                <th className="py-3 px-5 text-left">Địa chỉ</th>
                <th className="py-3 px-5 text-left">Vai trò</th>
                <th className="py-3 px-5 text-left">Ngày tạo</th>
                <th className="py-3 px-5 text-left">Avatar</th>
                <th className="py-3 px-5 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-5">{u.id}</td>
                    <td className="py-3 px-5">{u.username}</td>
                    <td className="py-3 px-5">{u.fullName || "—"}</td>
                    <td className="py-3 px-5">{u.email}</td>
                    <td className="py-3 px-5">{u.phone || "—"}</td>
                    <td className="py-3 px-5">{u.address || "—"}</td>
                    <td className="py-3 px-5">{u.role}</td>
                    <td className="py-3 px-5 text-sm text-gray-600">
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleString("vi-VN")
                        : "—"}
                    </td>
                    <td className="py-3 px-5">
                      {u.avatar ? (
                        <img
                          src={u.avatar}
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      ) : (
                        <span className="text-gray-400 italic">Chưa có</span>
                      )}
                    </td>
                    <td className="py-3 px-5 flex flex-wrap gap-2">
                      <NavLink
                        to={`/admin/user/detail/${u.id}`}
                        className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                      >
                        <FaEye /> Chi tiết
                      </NavLink>
                      <NavLink
                        to={`/admin/user/edit/${u.id}`}
                        className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200 transition"
                      >
                        <FaEdit /> Sửa
                      </NavLink>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
                      >
                        <FaTrash /> Xoá
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-400 italic">
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
