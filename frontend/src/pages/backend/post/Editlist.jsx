// src/pages/admin/post/EditPost.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostServices from "../../../services/PostServices";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const data = await PostServices.getPostById(id);
      setTitle(data.title);
      setContent(data.content);
      setPreview(data.image || null); // ảnh hiện có
      setLoading(false);
    } catch (error) {
      console.error("Lỗi load post:", error);
      alert("Không thể tải post!");
      navigate("/admin/post");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      return;
    }

    setSaving(true);
    try {
      await PostServices.updatePost(id, { title, content }, file);
      alert("Cập nhật post thành công!");
      navigate("/admin/post");
    } catch (error) {
      console.error("Lỗi cập nhật post:", error);
      alert("Cập nhật thất bại!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Chỉnh sửa Post</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 max-w-xl mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tiêu đề</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Nhập tiêu đề..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nội dung</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Nhập nội dung post..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-full h-64 object-cover rounded-lg border"
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={saving}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            {saving ? "Đang cập nhật..." : "Cập nhật Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/post")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
