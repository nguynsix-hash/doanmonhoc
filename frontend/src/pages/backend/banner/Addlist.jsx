import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import BannerServices from "@/services/BannerSevices";

const AddBanner = () => {
  const navigate = useNavigate(); // <-- tạo navigate
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const banner = { title, description };
      const res = await BannerServices.createBanner(banner, file);
      alert("🎉 Banner tạo thành công!");
      console.log("Banner created:", res);

      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      document.getElementById("fileInput").value = "";

      // Tự động quay về danh sách banner
      navigate("/admin/banner"); // <-- điều hướng
    } catch (error) {
      console.error("Lỗi khi tạo banner:", error);
      alert("❌ Tạo banner thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Thêm Banner Mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Tiêu đề:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Nhập tiêu đề banner"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Mô tả:</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả banner"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Ảnh banner:</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo Banner"}
        </button>
      </form>
    </div>
  );
};

export default AddBanner;
