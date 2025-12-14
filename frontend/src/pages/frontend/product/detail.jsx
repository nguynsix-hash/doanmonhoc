import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../../../services/ProductServices";
import { FaShoppingCart, FaTag } from "react-icons/fa";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getById(slug);
        setProduct(data);
        setSelectedImage(data.image ? "http://localhost:8080" + data.image : "/default-image.jpg");

        if (data?.id && data?.categoryId) {
          const related = await ProductService.getRelated(data.id, data.categoryId, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
      }
    };
    fetchProduct();
  }, [slug]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) cart[index].quantity += 1;
    else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        image: selectedImage,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  if (!product)
    return (
      <div className="text-center py-20 text-gray-500 animate-pulse text-lg">
        Đang tải chi tiết sản phẩm...
      </div>
    );

  return (
    <section className="bg-gradient-to-tr from-gray-50 to-white min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl p-6 md:p-12">
        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col space-y-4">
          <div className="rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[500px] object-contain bg-gray-50 transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail nếu có nhiều ảnh */}
          {product.images && product.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-2">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={"http://localhost:8080" + img}
                  alt={`thumbnail-${idx}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === "http://localhost:8080" + img
                      ? "border-green-600"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage("http://localhost:8080" + img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{product.name}</h1>

          <div className="flex items-center space-x-4">
            {product.discountPrice > 0 && (
              <span className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <FaTag /> -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
              </span>
            )}
            <span className="text-3xl md:text-4xl font-bold text-red-600">
              {Number(product.discountPrice > 0 ? product.discountPrice : product.price).toLocaleString()} đ
            </span>
            {product.discountPrice > 0 && (
              <span className="line-through text-gray-400 text-lg">{Number(product.price).toLocaleString()} đ</span>
            )}
          </div>

          {/* Thông tin nhanh */}
          <div className="flex flex-wrap gap-6 text-gray-600">
            <div><strong>Thương hiệu:</strong> {product.brandName}</div>
            <div><strong>Danh mục:</strong> {product.categoryName}</div>
            
          </div>

          {/* Mô tả */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 text-lg shadow-inner">
            {product.description || "Không có mô tả chi tiết."}
          </div>

          {/* Nút thêm giỏ hàng */}
          <button
            onClick={addToCart}
            className="mt-4 w-full md:w-auto flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            <FaShoppingCart className="text-xl" /> Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16 px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">🛒 Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={item.image ? "http://localhost:8080" + item.image : "/default-image.jpg"}
                  alt={item.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base font-semibold line-clamp-1">{item.name}</h3>
                  <div className="text-sm text-red-600 font-bold">
                    {Number(item.discountPrice > 0 ? item.discountPrice : item.price).toLocaleString()} đ
                  </div>
                  <button
                    onClick={() => navigate(`/san-pham/${item.id}`)}
                    className="mt-2 block w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded text-sm text-center"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
