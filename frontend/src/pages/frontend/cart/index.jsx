import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductServices from "../../../services/ProductServices";
import { useCart } from "../../../contexts/CartContext";
import { FaPlus, FaMinus, FaTrash, FaShoppingBag } from "react-icons/fa";

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, total } = useCart();
  const [productsMap, setProductsMap] = useState({});

  // Fetch product info cho cart items
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const ids = cartItems.map((item) => item.id);
        // Tối ưu: Nếu API hỗ trợ filter theo ID, nên dùng để giảm tải.
        const allProducts = await ProductServices.getAll();
        const map = {};
        allProducts.forEach((p) => {
          if (ids.includes(p.id)) {
            map[p.id] = p;
          }
        });
        setProductsMap(map);
      } catch (err) {
        console.error("❌ Lỗi lấy sản phẩm cho giỏ hàng:", err);
      }
    };

    if (cartItems.length > 0) fetchProducts();
  }, [cartItems]);

  const formatPrice = (price) => {
    return price ? price.toLocaleString() + "₫" : "N/A";
  };

  const getProductInfo = (item) => {
    const product = productsMap[item.id];
    const name = product?.name || item.name || "Sản phẩm không xác định";
    const price = product?.price_sale > 0 ? product.price_sale : product?.price || item.price || 0;
    const imageUrl = product?.image ? "http://localhost:8080" + product.image : "/placeholder.png";
    const subtotal = price * item.quantity;
    return { product, name, price, imageUrl, subtotal };
  };

  if (cartItems.length === 0)
    return (
      <div className="bg-gray-50 min-h-screen py-16 flex flex-col items-center justify-center">
        <FaShoppingBag className="text-8xl text-orange-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Giỏ hàng trống</h2>
        <p className="text-gray-600 text-lg mb-6">
          Chưa có sản phẩm nào trong giỏ hàng. Hãy thêm một vài sản phẩm bạn thích!
        </p>
        <Link
          to="/san-pham"
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all transform hover:scale-105"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold mb-10 text-gray-900 text-center tracking-tight">
          🛍️ Giỏ hàng của bạn
        </h2>

        <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-10">
          {/* Desktop/Tablet View (Table) */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Sản phẩm
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider w-32"
                  >
                    Giá
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider w-40"
                  >
                    Số lượng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider w-32"
                  >
                    Tổng
                  </th>
                  <th scope="col" className="relative px-6 py-4 w-10">
                    <span className="sr-only">Xóa</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => {
                  const { name, price, imageUrl, subtotal } = getProductInfo(item);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-20 w-20">
                            <img
                              className="h-20 w-20 rounded-lg object-cover border border-gray-100"
                              src={imageUrl}
                              alt={name}
                            />
                          </div>
                          <div className="ml-4">
                            <Link
                              to={`/product/${item.id}`} // Giả định có route đến trang chi tiết
                              className="text-lg font-medium text-gray-900 hover:text-orange-600 transition truncate max-w-xs block"
                              title={name}
                            >
                              {name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-lg text-blue-600 font-semibold">
                        {formatPrice(price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700 transition-colors disabled:opacity-50"
                              aria-label="Giảm số lượng"
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus className="w-4 h-4" />
                            </button>
                            <span className="min-w-[40px] text-center font-bold text-gray-800 text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                              aria-label="Tăng số lượng"
                            >
                              <FaPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xl font-bold text-green-700">
                        {formatPrice(subtotal)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                          title="Xóa sản phẩm khỏi giỏ hàng"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile View (Cards) */}
          <div className="md:hidden space-y-6">
            {cartItems.map((item) => {
              const { name, price, imageUrl, subtotal } = getProductInfo(item);
              return (
                <div
                  key={item.id}
                  className="flex border border-gray-200 rounded-lg shadow-sm bg-white p-4"
                >
                  <div className="flex-shrink-0 w-24 h-24">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className="text-lg font-bold text-gray-900 truncate"
                        title={name}
                      >
                        {name}
                      </h3>
                      <p className="text-md text-blue-600 font-semibold mt-1">
                        {formatPrice(price)}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700 transition-colors disabled:opacity-50"
                          aria-label="Giảm số lượng"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="min-w-[30px] text-center font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700 transition-colors"
                          aria-label="Tăng số lượng"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xl font-bold text-green-700">
                        {formatPrice(subtotal)}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      title="Xóa sản phẩm"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary & Checkout */}
          <div className="mt-12 pt-6 border-t-4 border-orange-100 flex flex-col md:flex-row justify-between items-center bg-orange-50 p-6 rounded-xl shadow-lg">
            <p className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">
              Tổng cộng:{" "}
              <span className="text-orange-600 ml-2">
                {formatPrice(total)}
              </span>
            </p>
            <Link
              to="/thanh-toan"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-10 py-4 rounded-xl shadow-2xl transition-all transform hover:scale-105 text-lg flex items-center justify-center w-full md:w-auto"
            >
              Tiến hành đặt hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;