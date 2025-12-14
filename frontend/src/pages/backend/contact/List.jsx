// src/pages/admin/contact/ContactList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactServices from "../../../services/ContactServices";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await ContactServices.getAllContacts();
      setContacts(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi lấy danh sách contact:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa contact này?")) return;
    try {
      await ContactServices.deleteContact(id);
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Lỗi xóa contact:", error);
    }
  };

  const handleUpdateStatus = async (id) => {
    const newStatus = prompt("Nhập trạng thái mới (NEW, READ, CLOSED):");
    if (!newStatus) return;
    try {
      const updated = await ContactServices.updateStatus(id, newStatus);
      setContacts(
        contacts.map((c) => (c.id === id ? { ...c, status: updated.status } : c))
      );
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-semibold">
        Đang tải danh sách...
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Danh sách Contact</h2>
        <button
          onClick={() => navigate("/admin/contact/add")}
          className="bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          Thêm mới
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Tên", "Email", "Phone", "Message", "Status", "Ngày tạo", "Hành động"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2 font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-2 text-gray-600">{c.email}</td>
                <td className="px-4 py-2 text-gray-600">{c.phone}</td>
                <td className="px-4 py-2 text-gray-600">{c.message}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      c.status === "NEW"
                        ? "bg-blue-100 text-blue-800"
                        : c.status === "READ"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => navigate(`/admin/contact/edit/${c.id}`)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(c.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  Không có contact nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
