import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import OrderService from "../../../services/OrderSevices";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  // 🔹 Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const data = await OrderService.getAllOrders();
      setOrders(data);
      console.log("Orders:", data); // <-- xem dữ liệu để xác định đúng field
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Reload khi state.updated = true (thêm/sửa xong)
  useEffect(() => {
    if (location.state?.updated) {
      fetchOrders();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 🔹 Xoá đơn hàng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá đơn hàng này?")) {
      try {
        await OrderService.deleteOrder(id);
        setOrders(orders.filter((o) => o.id !== id));
      } catch (error) {
        console.error("Lỗi khi xoá đơn hàng:", error);
      }
    }
  };

  // 🔹 Hiển thị trạng thái đơn hàng
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

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-indigo-800">
            📦 Danh sách Đơn hàng
          </h2>
          <NavLink
            to="/admin/order/add"
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-semibold shadow hover:bg-indigo-700"
          >
            <FaPlus /> Thêm Đơn hàng
          </NavLink>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-x-auto border border-gray-200">
          <table className="min-w-full text-sm text-gray-800 table-auto">
            <thead className="bg-indigo-100 text-left text-sm font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b">ID</th>
                <th className="px-4 py-3 border-b">Tên KH</th>
                <th className="px-4 py-3 border-b">Địa chỉ</th>
                <th className="px-4 py-3 border-b">Tổng tiền</th>
                <th className="px-4 py-3 border-b">Trạng thái</th>
                <th className="px-4 py-3 border-b text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-indigo-50 transition duration-150"
                  >
                    <td className="px-4 py-3 border-b">{order.id}</td>
                    
                    {/* ✅ Sửa Tên KH */}
                    <td className="px-4 py-3 border-b font-medium flex items-center gap-2">
                      <NavLink
                        to={`/admin/order/detail/${order.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {order.user?.fullName || order.customerName || "Không rõ"}
                      </NavLink>
                    </td>

                    <td className="px-4 py-3 border-b">{order.address}</td>
                    <td className="px-4 py-3 border-b font-semibold">
                      {order.totalAmount?.toLocaleString("vi-VN")} ₫
                    </td>
                    <td className="px-4 py-3 border-b">
                      {getStatusLabel(order.status)}
                    </td>
                    <td className="px-4 py-3 border-b flex justify-center gap-3">
                      <NavLink
                        to={`/admin/order/detail/${order.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </NavLink>
                      <NavLink
                        to={`/admin/order/edit/${order.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </NavLink>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Xoá"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Không có đơn hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
