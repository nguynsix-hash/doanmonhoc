import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerServices from "@/services/BannerSevices";

function BannerList() {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const data = await BannerServices.getAllBanners();
      setBanners(data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách banner:", error);
    }
  };

  const handleAddBanner = () => {
    navigate("/admin/banner/add");
  };

  const handleDeleteBanner = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá banner này?")) {
      try {
        await BannerServices.deleteBanner(id);
        alert("Xoá thành công");
        setBanners(banners.filter((banner) => banner.id !== id));
      } catch (error) {
        console.error("Lỗi khi xoá banner:", error);
        alert("Đã xảy ra lỗi khi xoá banner");
      }
    }
  };

  // ===== Hàm lấy URL ảnh từ backend =====
  const getBannerImageUrl = (banner) => {
    if (banner.imageUrl) {
      // Nếu imageUrl đã bắt đầu bằng http hoặc localhost, dùng trực tiếp
      return banner.imageUrl.startsWith("http")
        ? banner.imageUrl
        : `http://localhost:8080${banner.imageUrl}`;
    }
    return "/no-image.png"; // fallback
  };

  return (
    <div className="min-h-screen bg-yellow-50 px-6 py-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">📢 Danh sách Banner</h2>
          <button
            onClick={handleAddBanner}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md"
          >
            ➕ Thêm Banner mới
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full text-sm text-gray-700 table-auto">
            <thead className="bg-yellow-100 text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Tiêu đề</th>
                <th className="px-4 py-3 text-left">Hình ảnh</th>
                <th className="px-4 py-3 text-left">Mô tả</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {banners.length > 0 ? (
                banners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-yellow-50 transition">
                    <td className="border-t px-4 py-2">{banner.id}</td>
                    <td className="border-t px-4 py-2">{banner.title}</td>
                    <td className="border-t px-4 py-2">
                      <img
                        src={getBannerImageUrl(banner)}
                        alt={banner.title}
                        width="70"
                        height="70"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                          boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                        }}
                        onError={(e) => (e.target.src = "/no-image.png")}
                      />
                    </td>
                    <td className="border-t px-4 py-2">{banner.description}</td>
                    <td className="border-t px-4 py-2 text-center">
                      <button
                        onClick={() => navigate(`/admin/banner/detail/${banner.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 text-xs font-semibold"
                      >
                        🔍 Xem
                      </button>
                      <button
                        onClick={() => navigate(`/admin/banner/edit/${banner.id}`)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2 text-xs font-semibold"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(banner.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold"
                      >
                        🗑️ Xoá
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6 italic">
                    Không có banner nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BannerList;
