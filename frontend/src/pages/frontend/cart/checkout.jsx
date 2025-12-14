import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useCart } from "@/contexts/CartContext";
import OrderService from "../../../services/OrderSevices";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaLock, FaCheckCircle } from "react-icons/fa";

// Component con cho các trường input
const InfoField = ({ icon: Icon, label, value, onChange, placeholder, disabled = false, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
      <Icon className="w-4 h-4 mr-2 text-orange-500" />
      {label}
    </label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`p-3 border ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white border-gray-300 focus:border-orange-500'} rounded-lg transition duration-150 ease-in-out focus:ring-1 focus:ring-orange-500`}
      required
    />
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart(); // Sử dụng total từ CartContext nếu có
  const [currentUser, setCurrentUser] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Lấy thông tin user từ localStorage và đặt làm giá trị mặc định cho form
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
      setShippingInfo({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, []);

  // 🔹 Tính tổng tiền (fallback nếu CartContext không cung cấp)
  const totalAmount = useMemo(() => {
    // Nếu CartContext đã có total, dùng nó. Nếu không, tự tính toán.
    if (total !== undefined) return total; 
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems, total]);

  // 🔹 Xử lý thay đổi input
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Xử lý đặt hàng
  const handleOrder = async () => {
    if (!currentUser) {
      alert("Vui lòng đăng nhập trước khi đặt hàng!");
      return;
    }
    if (!cartItems || cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
      alert("Vui lòng nhập đầy đủ Tên, SĐT và Địa chỉ giao hàng!");
      return;
    }

    setIsLoading(true);

    // 🔹 Payload chuẩn cho backend
    const orderData = {
      customerName: shippingInfo.fullName,
      customerEmail: shippingInfo.email,
      customerPhone: shippingInfo.phone,
      address: shippingInfo.address,
      items: cartItems.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await OrderService.createOrder(orderData);
      if (res && res.id) {
        // Thay alert bằng thông báo tốt hơn
        alert("🎉 Đặt hàng thành công! Cảm ơn quý khách.");
        clearCart();
        navigate("/", { state: { orderId: res.id, orderData: res } });
      } else {
        alert("Đặt hàng thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err);
      alert("Đặt hàng thất bại! Đã xảy ra lỗi hệ thống.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="p-8 max-w-md bg-white rounded-xl shadow-lg text-center">
          <FaLock className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Truy cập bị từ chối</h2>
          <p className="text-gray-600 mb-4">
            Vui lòng **đăng nhập** hoặc **đăng ký** để tiếp tục quá trình đặt hàng.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          🧾 Xác nhận Đặt Hàng
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột 1: Thông tin giao hàng */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-2xl space-y-6 h-fit">
            <h3 className="text-2xl font-bold text-orange-600 border-b pb-3 mb-4 flex items-center">
              <FaMapMarkerAlt className="w-5 h-5 mr-2" />
              Thông tin giao hàng
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField
                icon={FaUser}
                label="Tên người nhận (Bắt buộc)"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={(e) => handleShippingChange({ target: { name: "fullName", value: e.target.value } })}
                placeholder="Ví dụ: Nguyễn Văn A"
              />
              <InfoField
                icon={FaPhone}
                label="Số điện thoại (Bắt buộc)"
                name="phone"
                value={shippingInfo.phone}
                onChange={(e) => handleShippingChange({ target: { name: "phone", value: e.target.value } })}
                placeholder="Ví dụ: 090xxxxxxx"
                type="tel"
              />
            </div>

            <InfoField
              icon={FaEnvelope}
              label="Email (Không thể thay đổi)"
              name="email"
              value={shippingInfo.email}
              disabled={true}
            />

            <InfoField
              icon={FaMapMarkerAlt}
              label="Địa chỉ giao hàng (Bắt buộc)"
              name="address"
              value={shippingInfo.address}
              onChange={(e) => handleShippingChange({ target: { name: "address", value: e.target.value } })}
              placeholder="Ví dụ: Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
            />

            <div className="mt-8">
              <h3 className="text-xl font-bold text-orange-600 border-b pb-3 mb-4 flex items-center">
                <FaCreditCard className="w-5 h-5 mr-2" />
                Phương thức thanh toán
              </h3>
              {/* Thêm lựa chọn thanh toán giả định */}
              <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-3 text-blue-800 font-semibold">
                <FaCheckCircle className="w-5 h-5 text-blue-600" />
                <span>Thanh toán khi nhận hàng (COD) - Hiện tại là phương thức duy nhất</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Tóm tắt đơn hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-2xl border-2 border-orange-200 sticky top-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Tóm tắt đơn hàng
              </h3>

              {/* Chi tiết sản phẩm */}
              <div className="border-b border-gray-200 pb-4 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 text-gray-700">
                    <span className="text-sm truncate pr-2">
                      {item.name} <span className="text-gray-500">x {item.quantity}</span>
                    </span>
                    <span className="font-medium text-right">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </span>
                  </div>
                ))}
              </div>

              {/* Tính tổng */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-lg text-gray-700">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">{totalAmount.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between text-lg text-gray-700">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between text-2xl font-bold pt-4 border-t border-gray-300">
                  <span>Tổng tiền:</span>
                  <span className="text-orange-600">{totalAmount.toLocaleString()}₫</span>
                </div>
              </div>

              {/* Nút đặt hàng */}
              <button
                onClick={handleOrder}
                disabled={isLoading || cartItems.length === 0}
                className={`w-full py-3 text-lg font-bold rounded-xl shadow-lg transition-all transform ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-600 text-white hover:bg-orange-700 hover:scale-[1.02]"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  "HOÀN TẤT ĐẶT HÀNG"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;