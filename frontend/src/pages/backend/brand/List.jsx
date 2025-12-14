import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrandService from "../../../services/BrandServices"; // chú ý: import đúng file

function BrandList() {
  const [brands, setBrands] = useState([]);

  // 🔹 Load tất cả brand
  const fetchBrands = async () => {
    try {
      const data = await BrandService.getAll(); // dùng getAll()
      setBrands(data || []);
    } catch (err) {
      console.error("❌ Lỗi tải brand:", err);
      setBrands([]);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // 🔹 Xóa brand
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa brand này không?")) return;
    try {
      await BrandService.remove(id); // dùng remove()
      setBrands(brands.filter((b) => b.id !== id));
      alert("✅ Xóa thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xóa brand.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">📦 Danh sách Thương hiệu</h2>
        <Link
          to="/admin/brand/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow text-sm font-medium transition"
        >
          + Thêm Brand
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
            <tr>
              <th className="px-5 py-3 border-b">ID</th>
              <th className="px-5 py-3 border-b">Tên</th>
              <th className="px-5 py-3 border-b">Mô tả</th>
              <th className="px-5 py-3 border-b">Hình ảnh</th>
              <th className="px-5 py-3 border-b">Ngày tạo</th>
              <th className="px-5 py-3 border-b text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3 border-b">{brand.id}</td>
                  <td className="px-5 py-3 border-b font-medium">{brand.name}</td>
                  <td className="px-5 py-3 border-b">{brand.description || <i>---</i>}</td>
                  <td className="px-5 py-3 border-b">
                    {brand.image ? (
                      <img
                        src={`http://localhost:8080${brand.image}`} // sửa URL theo backend
                        alt={brand.name}
                        className="w-24 h-16 object-cover rounded border shadow-sm"
                        onError={(e) => (e.target.src = "/no-image.png")}
                      />
                    ) : (
                      <i>Không có ảnh</i>
                    )}
                  </td>
                  <td className="px-5 py-3 border-b">
                    {brand.createdAt ? new Date(brand.createdAt).toLocaleString() : "---"}
                  </td>
                  <td className="px-5 py-3 border-b text-center space-x-2">
                    <Link
                      to={`/admin/brand/detail/${brand.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm shadow-sm"
                    >
                      👁️ Xem
                    </Link>
                    <Link
                      to={`/admin/brand/edit/${brand.id}`}
                      state={{ brand }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm shadow-sm"
                    >
                      ✏️ Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(brand.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow-sm"
                    >
                      🗑️ Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  Không có thương hiệu nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BrandList;
