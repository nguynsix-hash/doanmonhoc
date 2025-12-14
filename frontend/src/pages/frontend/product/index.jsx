import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductService from "../../../services/ProductServices"; // Thay đổi đường dẫn dịch vụ nếu cần
import CategoryServices from "../../../services/CategoryServices"; // Thay đổi đường dẫn dịch vụ nếu cần
import BrandService from "../../../services/BrandServices"; // Thay đổi đường dẫn dịch vụ nếu cần
import { FaShoppingCart, FaSearch, FaTag } from "react-icons/fa";
import { useCart } from "../../../contexts/CartContext"; // Thay đổi đường dẫn context nếu cần

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  // Bỏ state selectedCategory/selectedBrandId, thay thế bằng giá trị từ URL
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const limit = 8;
  const navigate = useNavigate();
  const location = useLocation();
  const { updateCartCount } = useCart();

  // 🔑 Lấy giá trị filter từ URL (Nguồn duy nhất)
  const params = new URLSearchParams(location.search);
  const urlSearchTerm = params.get("search") || "";
  const urlCategoryId = params.get("categoryId") || ""; // Lấy categoryId từ URL
  const urlBrandId = params.get("brandId") || ""; // Lấy brandId từ URL

  // State cục bộ cho input tìm kiếm
  const [productListSearchInput, setProductListSearchInput] = useState(urlSearchTerm);

  // --- Load category & brand ---
  useEffect(() => {
    CategoryServices.getAll().then(setCategories).catch(console.error);
    BrandService.getAll().then(setBrands).catch(console.error);

    // Đồng bộ input cục bộ với URL khi URL thay đổi
    setProductListSearchInput(urlSearchTerm);

  }, [location.search]); // Phụ thuộc vào location.search

  // --- Fetch products theo filter/search ---
  const fetchProducts = async () => {
    try {
      const data = await ProductService.filter({
        // Dùng giá trị trực tiếp từ URL
        categoryId: urlCategoryId || undefined,
        brandId: urlBrandId || undefined,
        search: urlSearchTerm || undefined,
      });

      setTotalPages(Math.ceil(data.length / limit));
      const start = (page - 1) * limit;
      setProducts(data.slice(start, start + limit));
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      setError("Không thể tải sản phẩm.");
    }
  };

  // SỬA: reset page khi filter/search (từ URL) thay đổi
  useEffect(() => {
    // Reset page về 1 khi bất kỳ filter nào thay đổi
    setPage(1); 
  }, [urlSearchTerm, urlCategoryId, urlBrandId]);

  // SỬA: fetch products khi filter/search (từ URL) hoặc page thay đổi
  useEffect(() => {
    fetchProducts();
  }, [urlSearchTerm, urlCategoryId, urlBrandId, page]);


  // Hàm chung để cập nhật URL Query Parameter
  const updateUrlParam = (key, value) => {
    const currentParams = new URLSearchParams(location.search);
    if (value) {
        currentParams.set(key, value);
    } else {
        currentParams.delete(key);
    }
    // Điều hướng để cập nhật URL, kích hoạt ProductList tải lại
    navigate(`${location.pathname}?${currentParams.toString()}`);
  }

  // Cập nhật input cục bộ khi người dùng gõ
  const handleInputTyping = (e) => {
    setProductListSearchInput(e.target.value);
  }

  // Xử lý khi Submit search (cập nhật URL)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = productListSearchInput.trim();

    // Lưu history tối đa 10
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 10);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    updateUrlParam('search', term);
  };


  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) cart[index].quantity += 1;
    else cart.push({
      id: product.id,
      name: product.name,
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
      image: product.image ? "http://localhost:8080" + product.image : "/placeholder.png",
      quantity: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  return (
    <section className="pt-8 pb-8 bg-white mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
          🛍️ Tất cả sản phẩm
        </h2>

        {/* Filter + Search */}
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          {/* Select Category */}
          <select
            // SỬA: Dùng giá trị từ URL
            value={urlCategoryId} 
            // SỬA: Cập nhật URL khi thay đổi
            onChange={e => updateUrlParam('categoryId', e.target.value)} 
            className="border p-2 rounded"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          {/* Select Brand */}
          <select
            // SỬA: Dùng giá trị từ URL
            value={urlBrandId}
            // SỬA: Cập nhật URL khi thay đổi
            onChange={e => updateUrlParam('brandId', e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Tất cả thương hiệu</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={productListSearchInput}
              onChange={handleInputTyping}
              className="border p-2 rounded w-full"
            />
          </form>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.length > 0 ? products.map(product => (
            <div key={product.id} className="relative bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 group overflow-hidden">
              {product.discountPrice > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center gap-1 shadow-md">
                  <FaTag className="text-[10px]" />
                  -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                </div>
              )}
              <img
                src={product.image ? "http://localhost:8080" + product.image : "/placeholder.png"}
                alt={product.name}
                className="w-full h-44 object-contain bg-white transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 line-clamp-1 text-gray-800">{product.name}</h3>
                <div className="mb-3">
                  {product.discountPrice > 0 ? (
                    <>
                      <p className="text-red-600 font-bold text-base">{Number(product.discountPrice).toLocaleString()} đ</p>
                      <p className="line-through text-gray-400 text-sm">{Number(product.price).toLocaleString()} đ</p>
                    </>
                  ) : <p className="text-blue-600 font-bold text-base">{Number(product.price).toLocaleString()} đ</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => navigate(`/san-pham/${product.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow">
                    <FaSearch /> Chi tiết
                  </button>
                  <button onClick={() => addToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow">
                    <FaShoppingCart /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 col-span-4 text-center">Không có sản phẩm nào.</p>
          )}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">← Trước</button>
          <span className="px-4 py-2 font-semibold text-blue-700">Trang {page}/{totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">Tiếp →</button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;