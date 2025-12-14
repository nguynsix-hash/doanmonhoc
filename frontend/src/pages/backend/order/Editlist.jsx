import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import OrderService from "../../../services/OrderSevices";

const EditOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    status: "PENDING",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await OrderService.getOrderById(id);
        // map backend response
        setForm({
          customerName: res.customerName || "",
          customerEmail: res.customerEmail || "",
          customerPhone: res.customerPhone || "",
          address: res.address || "",
          status: res.status || "PENDING",
        });
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
      }
    };
    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend hiện tại chỉ cho update status, hoặc cần tạo API update toàn bộ
      // Nếu chỉ cập nhật status:
      await OrderService.updateStatus(id, form.status);
      // Nếu backend hỗ trợ cập nhật thông tin khách hàng, tạo method mới trong OrderService
      navigate("/admin/order", { state: { updated: true } });
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
      alert("Không thể cập nhật đơn hàng. Vui lòng kiểm tra lại!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-2">
            ✏️ Chỉnh sửa đơn hàng
          </h2>
          <button
            onClick={() => navigate("/admin/orders")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600"
          >
            <FaArrowLeft /> Quay lại
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Tên khách hàng</label>
            <input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="text"
                name="customerPhone"
                value={form.customerPhone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Địa chỉ</label>
            <input
              type="text"
              name="address" // fix key
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="PENDING">Chờ xử lý</option>
              <option value="PROCESSING">Đang xử lý</option>
              <option value="COMPLETED">Hoàn thành</option>
              <option value="CANCELED">Đã huỷ</option>
            </select>
          </div>

          <div className="pt-4 text-right">
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700"
            >
              <FaSave /> Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
