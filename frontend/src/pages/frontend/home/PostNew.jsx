import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostServices from "../../../services/PostServices";
import { FaBookOpen, FaArrowRight } from "react-icons/fa"; // Thêm icon FaArrowRight

const PostNew = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await PostServices.getAllPosts();
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (data.posts) list = data.posts;
        setPosts(list.slice(0, 8)); // Giữ nguyên logic lấy 8 bài
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="py-16 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* --- Tiêu đề mới --- */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-500 pb-2 inline-flex items-center gap-3">
            <FaBookOpen className="text-blue-500" />
            <span className="tracking-tight">Bài Viết Mới Nhất</span>
          </h2>
          {/* Nút xem tất cả (optional) */}
          <Link
            to="/bai-viet"
            className="hidden sm:flex items-center text-blue-600 hover:text-blue-800 font-semibold transition duration-300 group"
          >
            Xem tất cả
            <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition duration-300" />
          </Link>
        </div>
        {/* --- Kết thúc Tiêu đề mới --- */}

        {/* Nếu không có bài */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Không có bài viết nào để hiển thị.
          </p>
        ) : (
          <div className="relative w-full">
            {/* Thanh trượt ngang */}
            <div
              className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth -mx-6 md:-mx-8 lg:-mx-10 px-6 md:px-8 lg:px-10"
            >
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/bai-viet/${post.id}`}
                  className="
                    flex-shrink-0
                    w-[280px] md:w-[320px] lg:w-[360px]
                    bg-white border border-gray-100 rounded-2xl
                    shadow-xl shadow-gray-200/50
                    hover:shadow-2xl hover:shadow-blue-200/60
                    transition-all duration-500 ease-in-out transform hover:-translate-y-2
                    snap-start
                    overflow-hidden
                  "
                >
                  {/* Hình ảnh */}
                  <div className="overflow-hidden rounded-t-2xl">
                    <img
                      src={
                        post.image
                          ? `http://localhost:8080${post.image}`
                          : "/default-image.jpg"
                      }
                      alt={post.title}
                      className="w-full h-52 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-image.jpg";
                      }}
                    />
                  </div>
                  
                  {/* Nội dung */}
                  <div className="p-5 border-t border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.description || "Chưa có mô tả..."}
                    </p>
                    <div className="text-sm font-semibold text-blue-600 flex items-center group">
                      Đọc ngay
                      <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostNew;