import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../../services/CategoryServices";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Gọi API lấy danh mục
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAll();
      setCategories(data || []);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh mục:", error);
      alert("Không thể tải danh sách danh mục!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Xử lý thêm danh mục
  const handleAdd = () => navigate("/admin/category/add");

  // ✅ Xử lý sửa
  const handleEdit = (id) => navigate(`/admin/category/edit/${id}`);

  // ✅ Xử lý xem chi tiết
  const handleDetail = (id) => navigate(`/admin/category/detail/${id}`);

  // ✅ Xử lý xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này không?")) return;
    try {
      await CategoryService.remove(id);
      alert("🗑️ Xóa danh mục thành công!");
      fetchCategories();
    } catch (error) {
      console.error("❌ Lỗi khi xóa danh mục:", error);
      alert("Xóa thất bại!");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📂 Danh sách danh mục</h4>
          <button
            onClick={handleAdd}
            className="btn btn-light text-primary fw-bold"
          >
            ➕ Thêm mới
          </button>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center text-secondary py-5">
              ⏳ Đang tải danh mục...
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center text-muted py-4 fst-italic">
              Không có danh mục nào.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    <th>Mô tả</th>
                    <th className="text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cate) => (
                    <tr key={cate.id}>
                      <td>{cate.id}</td>
                      <td className="fw-semibold">{cate.name}</td>
                      <td>{cate.description}</td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDetail(cate.id)}
                          className="btn btn-sm btn-info text-white me-2"
                        >
                          🔍 Xem
                        </button>
                        <button
                          onClick={() => handleEdit(cate.id)}
                          className="btn btn-sm btn-warning text-white me-2"
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(cate.id)}
                          className="btn btn-sm btn-danger"
                        >
                          🗑️ Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
