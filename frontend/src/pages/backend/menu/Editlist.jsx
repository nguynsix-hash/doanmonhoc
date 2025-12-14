import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const MenuEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost/PHPAPI/api/menu/read_one.php?id=${id}`);
        if (res.data) {
          setForm({
            name: res.data.name || "",
            link: res.data.link || "",
            position: res.data.position || "mainmenu",
            description: res.data.description || "",
            sort_order: res.data.sort_order ?? 0,
            parent_id: res.data.parent_id ?? 0,
            image: res.data.image || "",
            table_id: res.data.table_id ?? 0,
            type: res.data.type || "custom",
            status: res.data.status ?? 1,
          });
        } else {
          alert("❌ Không tìm thấy menu");
          navigate("/admin/menu");
        }
      } catch (error) {
        console.error(error);
        alert("❌ Lỗi khi tải menu.");
      }
    };
    fetchMenu();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["status", "parent_id", "sort_order", "table_id"].includes(name)
        ? parseInt(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost/PHPAPI/api/menu/update.php?id=${id}`,
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        alert("✅ Cập nhật menu thành công!");
        navigate("/admin/menu");
      } else {
        alert("❌ Lỗi: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Không thể kết nối đến server.");
    }
  };

  if (!form) {
    return <div className="text-center py-10 text-gray-500">⏳ Đang tải dữ liệu menu...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">✏️ Chỉnh sửa Menu</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Tên menu"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-3 border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="link"
          placeholder="Đường dẫn (link)"
          value={form.link}
          onChange={handleChange}
          required
          className="w-full mb-3 border px-4 py-2 rounded"
        />

        <select name="position" value={form.position} onChange={handleChange} className="w-full mb-3 border px-4 py-2 rounded">
          <option value="mainmenu">Main Menu</option>
          <option value="footermenu">Footer Menu</option>
        </select>

        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-3 border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="sort_order"
          placeholder="Thứ tự"
          value={form.sort_order}
          onChange={handleChange}
          className="w-full mb-3 border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="parent_id"
          placeholder="Menu cha (ID)"
          value={form.parent_id}
          onChange={handleChange}
          className="w-full mb-3 border px-4 py-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Tên ảnh (nếu có)"
          value={form.image}
          onChange={handleChange}
          className="w-full mb-3 border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="table_id"
          placeholder="ID liên kết (nếu có)"
          value={form.table_id}
          onChange={handleChange}
          className="w-full mb-3 border px-4 py-2 rounded"
        />

        <select name="type" value={form.type} onChange={handleChange} className="w-full mb-3 border px-4 py-2 rounded">
          <option value="custom">Tùy chỉnh</option>
          <option value="category">Danh mục</option>
          <option value="brand">Thương hiệu</option>
          <option value="topic">Chủ đề</option>
          <option value="page">Trang tĩnh</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange} className="w-full mb-4 border px-4 py-2 rounded">
          <option value={1}>Hiển thị</option>
          <option value={0}>Ẩn</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          💾 Cập nhật Menu
        </button>
      </form>
    </div>
  );
};

export default MenuEdit;
