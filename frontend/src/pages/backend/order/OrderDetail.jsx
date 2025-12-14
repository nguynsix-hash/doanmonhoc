import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import OrderService from "../../../services/OrderSevices";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await OrderService.getOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", error);
      }
    };
    fetchOrder();
  }, [id]);

  const getStatusLabel = (status = "PENDING") => {
    const map = {
      PENDING: ["bg-yellow-200", "text-yellow-800", "Chờ xử lý"],
      PROCESSING: ["bg-blue-200", "text-blue-800", "Đang xử lý"],
      COMPLETED: ["bg-green-200", "text-green-800", "Hoàn thành"],
      CANCELED: ["bg-red-200", "text-red-800", "Đã huỷ"],
    };
    const [bg, text, label] = map[status] || [
      "bg-gray-200",
      "text-gray-800",
      "Không rõ",
    ];
    return (
      <span className={`${bg} ${text} px-3 py-1 text-xs rounded-full font-medium`}>
        {label}
      </span>
    );
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-700">
            📄 Chi tiết Đơn hàng #{order.id}
          </h2>
          <button
            onClick={() => navigate("/admin/order")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600"
          >
            <FaArrowLeft /> Quay lại
          </button>
        </div>

        {/* Thông tin khách hàng */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Thông tin khách hàng</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium">Tên:</span> {order.customerName || order.userFullName || "Không rõ"}</p>
              <p><span className="font-medium">Email:</span> {order.customerEmail || "Không rõ"}</p>
              <p><span className="font-medium">SĐT:</span> {order.customerPhone || "Không rõ"}</p>
            </div>
            <div>
              <p><span className="font-medium">Địa chỉ:</span> {order.address}</p>
              <p><span className="font-medium">Trạng thái:</span> {getStatusLabel(order.status)}</p>
              <p><span className="font-medium">Tổng tiền:</span> {order.totalAmount?.toLocaleString("vi-VN")} ₫</p>
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Danh sách sản phẩm</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-800 table-auto border border-gray-200 rounded-lg">
              <thead className="bg-indigo-100 text-left font-semibold uppercase">
                <tr>
                  <th className="px-4 py-2 border-b">#</th>
                  <th className="px-4 py-2 border-b">Tên sản phẩm</th>
                  <th className="px-4 py-2 border-b">Số lượng</th>
                  <th className="px-4 py-2 border-b">Giá</th>
                  <th className="px-4 py-2 border-b">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, index) => (
                  <tr key={index} className="hover:bg-indigo-50 transition duration-150">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{item.productName}</td>
                    <td className="px-4 py-2 border-b">{item.quantity}</td>
                    <td className="px-4 py-2 border-b">{item.price?.toLocaleString("vi-VN")} ₫</td>
                    <td className="px-4 py-2 border-b">
                      {(item.price * item.quantity)?.toLocaleString("vi-VN")} ₫
                    </td>
                  </tr>
                ))}
                {(!order.items || order.items.length === 0) && (
                  <tr>
                    <td colSpan={5} className="text-center py-4">Không có sản phẩm</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
