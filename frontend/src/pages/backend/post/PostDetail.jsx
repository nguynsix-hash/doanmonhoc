import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostServices from "../../../services/PostServices";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const data = await PostServices.getPostById(id);
      setPost(data);
    } catch (error) {
      console.error("Lỗi load post:", error);
      alert("Không thể tải bài viết!");
      navigate("/admin/post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-gray-500">Đang tải dữ liệu...</div>;
  if (!post) return <div className="p-6 text-red-500">Bài viết không tồn tại</div>;

  // Format ngày tạo
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("vi-VN");
    } catch {
      return "Không xác định";
    }
  };

  // Nếu image là đường dẫn tương đối (chỉ chứa /uploads/...), thì thêm host
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : `http://localhost:8080${post.image}`;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h2>

        <p className="text-gray-500 mb-4">
          Ngày tạo: <span className="font-medium">{formatDate(post.createdAt)}</span>
        </p>

        {post.image && (
          <div className="flex justify-center">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full max-h-[480px] object-cover rounded-lg shadow mb-6 border"
            />
          </div>
        )}

        <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
          {post.content}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate("/admin/post")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
          >
            ← Quay lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
