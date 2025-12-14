import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderSevices"; // ✅ đảm bảo đúng tên file

const OrderAdd = () => {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: 1 }]); // chỉ productId + quantity

  const handleAddItem = () => {
    setItems([...items, { productId: "", quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === "quantity" ? Number(value) : value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // payload gửi lên backend
    const orderData = {
      customerName,
      customerEmail,
      customerPhone,
      address,
      items, // [{ productId: 19, quantity: 1 }, ...]
    };

    try {
      await OrderService.createOrder(orderData);
      navigate("/admin/order", { state: { updated: true } });
    } catch (error) {
      console.error(
        "❌ Lỗi khi thêm đơn hàng:",
        error.response ? error.response.data : error
      );
      alert("Không thể thêm đơn hàng. Vui lòng kiểm tra lại!");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-800">➕ Thêm Đơn hàng</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Thông tin khách hàng */}
          <div>
            <label className="block text-sm font-medium">Tên KH</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">SĐT</label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Địa chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Danh sách sản phẩm */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Danh sách sản phẩm</label>
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Product ID"
                  value={item.productId}
                  onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Số lượng"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  className="w-1/3 border border-gray-300 rounded-md p-2"
                  min={1}
                  required
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-600 hover:text-red-900 px-2"
                  >
                    Xoá
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              + Thêm sản phẩm
            </button>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Lưu Đơn hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderAdd;
