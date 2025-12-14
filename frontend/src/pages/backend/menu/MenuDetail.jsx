import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import menuServices from "../../../services/MenuServices";
import { IMG_URL } from "../../../services/config";

export default function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState("");

  const fetchMenu = async () => {
    try {
      const res = await menuServices.getOne(id);
      setMenu(res);
    } catch (err) {
      setError("Không thể tải chi tiết menu.");
      console.error("Lỗi khi tải chi tiết menu:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [id]);

  if (error) {
    return <div className="text-red-600 text-center py-10">{error}</div>;
  }

  if (!menu) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
      <h1 className="text-2xl font-bold text-green-700 mb-4">📄 Chi tiết Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
        <div><strong>ID:</strong> {menu.id}</div>
        <div><strong>Tên:</strong> {menu.name}</div>
        <div><strong>Đường dẫn:</strong> {menu.link}</div>
        <div><strong>Vị trí:</strong> {menu.position}</div>
        <div><strong>Loại:</strong> {menu.type}</div>
        <div><strong>Trạng thái:</strong> {menu.status === "1" ? "Hiển thị" : "Ẩn"}</div>
        <div className="sm:col-span-2"><strong>Mô tả:</strong> {menu.description}</div>
        <div className="sm:col-span-2">
          <strong>Hình ảnh:</strong><br />
          {menu.thumbnail ? (
            <img
              src={`${IMG_URL}/menu/${menu.thumbnail}`}
              alt={menu.name}
              className="w-40 h-40 object-cover mt-2 rounded shadow"
            />
          ) : (
            <span className="italic text-gray-400">Không có ảnh</span>
          )}
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          🔙 Quay lại
        </button>
        <button
          onClick={() => navigate(`/admin/menu/edit/${menu.id}`)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
        >
          ✏️ Sửa
        </button>
      </div>
    </div>
  );
}
