import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import PostServices from "../../../services/PostServices";
import { FaCalendarAlt, FaUserEdit, FaTag, FaChevronRight } from "react-icons/fa";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const data = await PostServices.getPostById(id);
        setPost(data);
        window.scrollTo(0, 0); // Kéo top khi đổi bài

        // Fetch Related Posts
        const allPosts = await PostServices.getAllPosts();
        const filtered = allPosts
          .filter((item) => item.id !== Number(id))
          .slice(0, 4); // Lấy 4 bài viết liên quan
        setRelatedPosts(filtered);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-medium text-gray-600">Đang tải nội dung...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Bài viết không tồn tại</h2>
        <p className="text-gray-600 mb-6">Chúng tôi không tìm thấy bài viết bạn yêu cầu.</p>
        <Link to="/blog" className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
          Quay lại Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Cột chính: Nội dung bài viết */}
          <article className="lg:col-span-2">
            
            {/* Header và Metadata */}
            <header className="mb-8">
              <h1 className="text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 italic mb-4">
                {post.description}
              </p>

              <div className="flex items-center space-x-4 text-sm text-gray-500 border-y py-3">
                <div className="flex items-center">
                  <FaCalendarAlt className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Đăng ngày: {formatDate(post.createdAt)}</span>
                </div>
                {/* Giả định có trường author và category */}
                <div className="flex items-center">
                  <FaUserEdit className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Tác giả: {post.author || "Admin"}</span> 
                </div>
                {post.category && (
                  <div className="flex items-center">
                    <FaTag className="w-4 h-4 mr-2 text-orange-500" />
                    <span>Chủ đề: {post.category}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Hình ảnh chính */}
            <figure className="mb-10">
              <img
                src={
                  post.image
                    ? `http://localhost:8080${post.image}`
                    : "/default-image.jpg"
                }
                alt={post.title}
                className="w-full max-h-[500px] object-cover rounded-xl shadow-2xl transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-image.jpg";
                }}
              />
              {/* Giả định có chú thích hình ảnh */}
              {post.image_caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2">
                      {post.image_caption}
                  </figcaption>
              )}
            </figure>

            {/* Nội dung chi tiết */}
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">
              {/* Thêm prose-lg để tăng kích thước chữ và khoảng cách dòng cho nội dung HTML */}
              <div dangerouslySetInnerHTML={{ __html: post.content || "<p>Không có nội dung chi tiết.</p>" }} />
            </div>

            {/* Footer bài viết */}
            <footer className="pt-6 border-t border-gray-200">
                <p className="text-md font-semibold text-gray-700">Cảm ơn bạn đã đọc bài viết này! Chia sẻ nếu bạn thấy hữu ích.</p>
            </footer>
          </article>

          {/* Cột phụ: Bài viết liên quan (Sidebar) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-10 p-6 bg-gray-50 rounded-xl shadow-lg border-l-4 border-orange-500">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                🔥 Bài viết liên quan
              </h2>
              <div className="space-y-6">
                {relatedPosts.map((rp) => (
                  <Link
                    to={`/post/${rp.id}`}
                    key={rp.id}
                    className="flex space-x-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <img
                      src={
                        rp.image
                          ? `http://localhost:8080${rp.image}`
                          : "/default-image.jpg"
                      }
                      alt={rp.title}
                      className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-image.jpg";
                      }}
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {rp.title}
                      </h3>
                      <span className="text-sm text-gray-500 flex items-center mt-1">
                          Đọc ngay <FaChevronRight className="w-3 h-3 ml-2" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Nút xem thêm blog */}
              <div className="mt-8 text-center">
                <Link 
                    to="/bai-viet"
                    className="inline-flex items-center text-orange-600 font-bold hover:text-orange-700 transition-colors"
                >
                    Xem tất cả bài viết
                    <FaChevronRight className="w-3 h-3 ml-2" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;