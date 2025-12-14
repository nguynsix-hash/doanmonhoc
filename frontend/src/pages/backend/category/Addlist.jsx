// src/pages/categories/AddCategory.jsx
import React, { useState } from "react";
import CategoryService from "../../../services/CategoryServices";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await CategoryService.add(category);
      alert("✅ Thêm danh mục thành công!");
      navigate("/admin/category"); // quay lại trang danh sách
    } catch (error) {
      alert("❌ Lỗi khi thêm danh mục!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Thêm danh mục mới</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
            placeholder="Nhập tên danh mục..."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            name="description"
            value={category.description}
            onChange={handleChange}
            placeholder="Nhập mô tả..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Thêm danh mục"}
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
