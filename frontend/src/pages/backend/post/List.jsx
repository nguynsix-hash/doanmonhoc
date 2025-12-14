// src/pages/admin/post/PostList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostServices from "../../../services/PostServices";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await PostServices.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error("Lỗi load posts:", error);
      alert("Không thể tải danh sách post!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa post này?")) return;
    try {
      await PostServices.deletePost(id);
      alert("Xóa thành công!");
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error("Lỗi xóa post:", error);
      alert("Xóa thất bại!");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Danh sách Post</h2>
        <button
          onClick={() => navigate("/admin/post/add")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          Thêm Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {post.image && (
                <img
                  src={`http://localhost:8080${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.content}</p>
                <p className="text-gray-500 text-xs mb-3">
                  Tạo lúc: {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/admin/post/edit/${post.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => navigate(`/admin/post/detail/${post.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                  >
                    Xem
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            Chưa có post nào
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
