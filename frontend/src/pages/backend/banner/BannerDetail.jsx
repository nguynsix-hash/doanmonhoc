// DetailBanner.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BannerServices from "@/services/BannerSevices";

const DetailBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await BannerServices.getBannerById(id);
        setBanner(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết banner:", error);
        alert("Không thể lấy thông tin banner");
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, [id]);

  const getBannerImage = () => {
    if (!banner) return null;
    if (banner.imageUrl)
      return banner.imageUrl.startsWith("http")
        ? banner.imageUrl
        : `http://localhost:8080${banner.imageUrl}`;
    if (banner.fileName) return `http://localhost:8080/uploads/banners/${banner.fileName}`;
    return null;
  };

  if (loading) return <p className="text-center py-10">Đang tải...</p>;
  if (!banner) return <p className="text-center py-10">Banner không tồn tại.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">📌 Chi tiết Banner</h2>

      <div className="mb-4">
        <label className="block font-semibold">ID:</label>
        <p className="ml-2">{banner.id}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Tiêu đề:</label>
        <p className="ml-2">{banner.title}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Mô tả:</label>
        <p className="ml-2">{banner.description || "Không có mô tả"}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Hình ảnh:</label>
        {getBannerImage() ? (
          <img
            src={getBannerImage()}
            alt={banner.title}
            className="w-64 h-auto rounded shadow"
            onError={(e) => (e.target.src = "/no-image.png")}
          />
        ) : (
          <span className="text-gray-500 italic">Chưa có ảnh</span>
        )}
      </div>

      <button
        onClick={() => navigate("/admin/banner")}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        🔙 Quay về danh sách
      </button>
    </div>
  );
};

export default DetailBanner;
