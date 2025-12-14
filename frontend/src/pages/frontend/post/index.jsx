import { useEffect, useState, useMemo, useCallback } from 'react';
import PostServices from '../../../services/PostServices';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PostAll = () => {
  // Giả định PostServices.getAllPosts() trả về MẢNG TẤT CẢ bài viết
  // Nếu API có phân trang, ta nên thay đổi logic fetchPosts để gọi API có tham số page/limit
  const [allPosts, setAllPosts] = useState([]); // Lưu trữ tất cả bài viết từ API
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 6;

  // Hàm định dạng ngày tháng (tùy chọn)
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const data = await PostServices.getAllPosts();
      if (Array.isArray(data)) {
        setAllPosts(data);
      } else {
        setAllPosts([]);
      }
    } catch (err) {
      console.error("Lỗi khi tải bài viết:", err);
      setAllPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []); // Chỉ gọi một lần khi mount

  // 🔹 Logic phân trang frontend
  const totalPages = useMemo(() => {
    if (allPosts.length === 0) return 1;
    return Math.ceil(allPosts.length / limit);
  }, [allPosts.length]);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * limit;
    return allPosts.slice(start, start + limit);
  }, [allPosts, page, limit]);

  // 🔹 Điều khiển phân trang
  const handlePrev = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  // 🔹 Component hiển thị Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-medium text-gray-600">Đang tải bài viết...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">TIN TỨC & KIẾN THỨC</p>
          <h1 className="text-5xl font-extrabold mt-2 text-gray-900">
            📰 Blog của chúng tôi
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Cập nhật các mẹo hay, xu hướng mới nhất và thông tin hữu ích.
          </p>
        </header>

        {/* Danh sách bài viết */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col group">
                  {/* Hình ảnh */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={
                        post.image
                          ? `http://localhost:8080${post.image}`
                          : "/default-image.jpg"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-image.jpg";
                      }}
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FaCalendarAlt className="w-4 h-4 mr-2 text-orange-400" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                      {post.description}
                    </p>

                    <span
                      className="mt-auto text-lg font-semibold text-orange-600 group-hover:text-orange-700 transition-colors flex items-center"
                    >
                      Đọc thêm
                      <FaChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-10 bg-white rounded-xl shadow-lg">
              <p className="text-xl text-gray-600">Không có bài viết nào được tìm thấy.</p>
              <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
                Quay về trang chủ
              </Link>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {/* Nút Trước */}
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="p-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm"
              aria-label="Trang trước"
            >
              <FaChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Trước</span>
            </button>

            {/* Các nút số trang */}
            <div className="flex items-center gap-1 mx-4">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
                    pageNumber === page
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-orange-100 border border-gray-200"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            
            {/* Nút Tiếp */}
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="p-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm"
              aria-label="Trang sau"
            >
              <span className="hidden sm:inline mr-2">Tiếp</span>
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostAll;