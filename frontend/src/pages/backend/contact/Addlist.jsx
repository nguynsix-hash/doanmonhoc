// src/pages/admin/contact/ContactAdd.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactServices from "../../../services/ContactServices";

const ContactAdd = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    setLoading(true);
    try {
      await ContactServices.createContact({ name, email, phone, message });
      alert("Thêm contact thành công!");
      navigate("/admin/contact"); // trở về list
    } catch (error) {
      console.error("Lỗi thêm contact:", error);
      alert("Thêm contact thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Thêm Contact mới</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Nhập tên"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Nhập email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Nhập nội dung"
            rows={4}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            {loading ? "Đang thêm..." : "Thêm mới"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/contact")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactAdd;
