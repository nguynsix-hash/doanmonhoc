import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserServices from "../../../services/UserServices";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await UserServices.getById(id);
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("❌ Không thể tải thông tin người dùng!");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Đang tải thông tin người dùng...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 font-medium">{error}</div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Không tìm thấy người dùng.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        👤 Thông tin người dùng
      </h2>

      {user.avatar && (
        <div className="flex justify-center mb-4">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
        </div>
      )}

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">🆔 ID:</span> {user.id}
        </p>
        <p>
          <span className="font-semibold">👤 Username:</span> {user.username}
        </p>
        <p>
          <span className="font-semibold">📛 Họ tên:</span>{" "}
          {user.fullName || "—"}
        </p>
        <p>
          <span className="font-semibold">📧 Email:</span> {user.email || "—"}
        </p>
        <p>
          <span className="font-semibold">📱 Số điện thoại:</span>{" "}
          {user.phone || "—"}
        </p>
        <p>
          <span className="font-semibold">🏠 Địa chỉ:</span>{" "}
          {user.address || "—"}
        </p>
        <p>
          <span className="font-semibold">🔑 Quyền:</span> {user.role}
        </p>
      </div>

      <button
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/admin/user"))}
        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        ⬅️ Quay lại
      </button>
    </div>
  );
}

export default UserDetail;
