import React, { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryServices"; // Thay đổi đường dẫn dịch vụ nếu cần
import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphonesAlt,
  FaCamera,
  FaArrowRight,
} from "react-icons/fa";
import { IoMdWatch } from "react-icons/io";

export default function CategoryList({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAll();
        if (Array.isArray(data)) setCategories(data);
        else if (data.content) setCategories(data.content);
        else setCategories([]);
      } catch (error) {
        console.error("❌ Lỗi tải danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryIcon = (name = "") => {
    const lower = name.toLowerCase();
    if (lower.includes("điện thoại")) return <FaMobileAlt />;
    if (lower.includes("laptop")) return <FaLaptop />;
    if (lower.includes("phụ kiện") || lower.includes("tai nghe"))
      return <FaHeadphonesAlt />;
    if (lower.includes("đồng hồ")) return <IoMdWatch />;
    if (lower.includes("máy ảnh")) return <FaCamera />;
    return "✨";
  };

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Khám Phá Danh Mục 🛍️
        </h2>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Tìm kiếm sản phẩm yêu thích của bạn một cách dễ dàng
        </p>

        {loading ? (
          // Skeleton Loading Effect (Hiệu ứng tải)
          <div className="flex gap-6 justify-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-48 h-48 bg-white rounded-xl shadow-lg border border-gray-200 animate-pulse"
              >
                <div className="w-full h-3/5 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-500 p-10 bg-white rounded-lg shadow-inner">
            Không có danh mục nào được tìm thấy.
          </div>
        ) : (
          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <div
              className={`flex gap-6 py-4`}
              style={{
                minWidth: "max-content", // Đảm bảo cuộn cho mọi kích thước
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  // SỬA: Gọi onSelectCategory với ID danh mục
                  onClick={() => onSelectCategory?.(cat.id)}
                  className="flex-none w-48 h-48 bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-green-500 group relative overflow-hidden flex flex-col items-center justify-center p-2"
                >
                  {/* Hiển thị Icon hoặc Ảnh */}
                  <div className="w-full h-2/3 flex items-center justify-center text-6xl text-green-600 bg-white group-hover:bg-green-50 transition-colors duration-300 rounded-t-xl">
                    {cat.imageUrl ? (
                      <img
                        src={`http://localhost:8080${cat.imageUrl}`}
                        alt={cat.name}
                        className="w-full h-full object-cover rounded-t-xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-category.jpg";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-green-600 bg-white group-hover:bg-green-50 transition-colors duration-300 rounded-t-xl">
                        {getCategoryIcon(cat.name)}
                      </div>
                    )}
                  </div>

                  {/* Tên Danh mục */}
                  <div className="p-3 w-full text-center flex-grow flex items-center justify-center">
                    <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-green-700 transition-colors duration-300 relative">
                      {cat.name}
                      {/* Hiệu ứng mũi tên khi hover */}
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-300">
                        <FaArrowRight className="w-4 h-4 text-green-500" />
                      </span>
                    </h3>
                  </div>

                  {/* Hiệu ứng border dưới */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CSS cho thanh cuộn tùy chỉnh */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #a7f3d0; /* green-200 */
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #34d399; /* green-400 */
          }
        `}</style>
      </div>
    </section>
  );
}