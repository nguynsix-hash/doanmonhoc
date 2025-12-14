import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BrandService from "../../../services/BrandServices";

function BrandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    BrandService.get(id)
      .then((data) => setBrand(data))
      .catch((err) => {
        console.error(err);
        alert("Không thể tải chi tiết brand.");
      });
  }, [id]);

  if (!brand) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">👁️ Chi tiết Brand</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
        <div>
          <p><strong>ID:</strong> {brand.id}</p>
          <p><strong>Tên:</strong> {brand.name}</p>
          <p><strong>Mô tả:</strong> {brand.description || "---"}</p>
          <p><strong>Ngày tạo:</strong> {brand.createdAt ? new Date(brand.createdAt).toLocaleString() : "---"}</p>
        </div>
        <div>
          <p><strong>Hình ảnh:</strong></p>
          {brand.image ? (
            <img
              src={`http://localhost:8080/uploads/brands/${brand.image}`}
              alt={brand.name}
              className="w-48 h-32 object-cover rounded border mt-2"
            />
          ) : (
            <p className="italic text-gray-400">Không có ảnh</p>
          )}
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <button onClick={() => navigate(-1)} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded">
          ← Quay lại
        </button>
        <button onClick={() => navigate(`/admin/brand/edit/${brand.id}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded">
          ✏️ Sửa
        </button>
      </div>
    </div>
  );
}

export default BrandDetail;
