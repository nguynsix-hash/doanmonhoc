// EditBanner.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BannerServices from "@/services/BannerSevices";

const EditBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu banner theo id
  // trong useEffect khi fetch banner
useEffect(() => {
  const fetchBanner = async () => {
    try {
      const banner = await BannerServices.getBannerById(id);
      setTitle(banner.title);
      setDescription(banner.description);

      // Lấy ảnh hiện tại
      const imgUrl = banner.imageUrl
        ? banner.imageUrl.startsWith("http")
          ? banner.imageUrl
          : `http://localhost:8080${banner.imageUrl}` // nếu imageUrl trả "/uploads/..." thì thêm localhost
        : banner.fileName
        ? `http://localhost:8080/uploads/banners/${banner.fileName}` // fallback fileName
        : null;

      setCurrentImage(imgUrl);
    } catch (error) {
      console.error("Lỗi khi lấy banner:", error);
      alert("Không thể lấy thông tin banner");
    }
  };
  fetchBanner();
}, [id]);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const banner = { title, description };
      await BannerServices.updateBanner(id, banner, file);
      alert("🎉 Cập nhật banner thành công!");
      navigate("/admin/banner"); // redirect về list
    } catch (error) {
      console.error("Lỗi khi cập nhật banner:", error);
      alert("❌ Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">✏️ Sửa Banner</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Tiêu đề:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Mô tả:</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Ảnh hiện tại:</label>
          {currentImage ? (
            <img
              src={currentImage}
              alt="Current Banner"
              className="w-32 h-auto rounded mb-2"
            />
          ) : (
            <span className="text-gray-500 italic">Chưa có ảnh</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Thay ảnh mới:</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật Banner"}
        </button>
      </form>
    </div>
  );
};

export default EditBanner;
