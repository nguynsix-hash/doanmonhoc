// src/pages/admin/contact/ContactEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactServices from "../../../services/ContactServices";

const ContactEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "NEW",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      const data = await ContactServices.getContactById(id);
      setContact({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        status: data.status,
      });
      setLoading(false);
    } catch (error) {
      console.error("Lỗi load contact:", error);
      alert("Không thể tải contact!");
      navigate("/admin/contact");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message, status } = contact;
    if (!name || !email || !phone || !message || !status) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setSaving(true);
    try {
      await ContactServices.updateContact(id, contact); // chỉ update contact
      alert("Cập nhật contact thành công!");
      navigate("/admin/contact");
    } catch (error) {
      console.error("Lỗi cập nhật contact:", error);
      alert("Cập nhật thất bại!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Chỉnh sửa Contact</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto"
      >
        {["name", "email", "phone"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 font-medium mb-2">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={contact[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            name="message"
            value={contact.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            name="status"
            value={contact.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="NEW">NEW</option>
            <option value="READ">READ</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={saving}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            {saving ? "Đang cập nhật..." : "Cập nhật"}
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

export default ContactEdit;
