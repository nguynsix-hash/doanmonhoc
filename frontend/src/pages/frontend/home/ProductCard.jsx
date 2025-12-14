import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductServices";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ limit = 8 }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        if (Array.isArray(data)) {
          // KHẮC PHỤC LỖI LOGIC: Đảm bảo lọc trùng lặp ID
          const uniqueProductsMap = new Map(
            data.map((item) => [item.id, item])
          );
          const uniqueProducts = Array.from(uniqueProductsMap.values());

          // Sản phẩm giảm giá (ưu tiên 1): Sắp xếp theo ID giảm dần (mới nhất)
          const discountProducts = uniqueProducts
            .filter((p) => p.discountPrice && p.discountPrice > 0)
            .sort((a, b) => b.id - a.id);

          // SỬA LỖI LOGIC: Lọc sản phẩm không giảm giá dựa trên thuộc tính
          const nonDiscountProducts = uniqueProducts
            .filter((p) => !(p.discountPrice && p.discountPrice > 0))
            .sort((a, b) => b.id - a.id);

          const finalProducts = [
            ...discountProducts.slice(0, limit),
            ...nonDiscountProducts.slice(0, Math.max(0, limit - discountProducts.length)),
          ];

          setProducts(finalProducts.slice(0, limit));
        }
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
      }
    };

    fetchProducts();
  }, [limit]);

  const getImageSrc = (image) => {
    if (!image) return "/images/no-image.png";
    if (image.startsWith("http")) return image;
    return `http://localhost:8080${image}`;
  };

  const handleNavigate = (id) => {
    navigate(`/san-pham/${id}`);
  };

  // Loại bỏ hàm handleAddToCart vì giao diện mẫu không có nút "Thêm vào giỏ hàng"

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* 🚀 Tiêu đề (Giữ nguyên cấu trúc) */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-2">
            Đừng bỏ lỡ
          </p>
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            🔥 Sản Phẩm Nổi Bật Nhất
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Không có sản phẩm nào để hiển thị.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((p) => (
              /* 📦 THẺ SẢN PHẨM PHONG CÁCH GIÀY TỐI GIẢN */
              <div
                key={p.id}
                className="group relative bg-gray-100 rounded-3xl shadow-none hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-end h-[450px] cursor-pointer"
                onClick={() => handleNavigate(p.id)} // Toàn bộ card có thể click
              >
                {/* Image Container (Floating Effect) */}
                <div className="absolute top-0 left-0 right-0 h-2/3 flex items-center justify-center overflow-hidden p-6 z-10">
                  <img
                    src={getImageSrc(p.image)}
                    alt={p.name}
                    // ĐÃ ĐỔI: object-contain -> object-cover để lấp đầy container
                    className="w-full h-full **object-cover** transition-transform duration-500 transform 
                                group-hover:scale-110 
                                drop-shadow-2xl" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/no-image.png";
                      // Giữ object-contain cho ảnh lỗi để nó không bị cắt
                      e.target.className = "w-1/2 h-1/2 **object-contain**"; 
                    }}
                  />
                  {/* Discount Badge - Giữ lại nhưng làm tối giản */}
                  {p.discountPrice && p.discountPrice > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-extrabold px-2 py-1 rounded-lg z-20">
                      -{Math.round(((p.price - p.discountPrice) / p.price) * 100)}%
                    </div>
                  )}
                </div>

                {/* Content - Đặt ở phía dưới cùng */}
                <div className="pt-20 z-20"> {/* Khoảng cách trên cho nội dung dưới */}
                  <h3 className="text-3xl font-bold text-gray-900 mb-1 line-clamp-2 min-h-[72px]">
                    {p.name}
                  </h3>

                  {/* Price Block */}
                  <div className="flex items-center justify-between mt-2">
                    {/* Giá tiền */}
                    <div className="flex flex-col">
                      {p.discountPrice && p.discountPrice > 0 ? (
                        <>
                          <span className="text-3xl font-extrabold text-gray-900">
                            {Number(p.discountPrice).toLocaleString("vi-VN")}₫
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {Number(p.price).toLocaleString("vi-VN")}₫
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-extrabold text-gray-900">
                          {Number(p.price).toLocaleString("vi-VN")}₫
                        </span>
                      )}
                    </div>
                    
                    {/* Nút mũi tên */}
                    <button
                      className="p-3 bg-white text-gray-900 rounded-full shadow-md transition transform group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110"
                      title="Xem chi tiết"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCard;