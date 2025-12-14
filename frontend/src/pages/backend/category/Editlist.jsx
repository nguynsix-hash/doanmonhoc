import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../../services/CategoryServices";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Lấy thông tin danh mục cần sửa
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getById(id);
      setCategory(data);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh mục:", error);
      alert("Không thể tải thông tin danh mục!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  // ✅ Cập nhật state khi người dùng nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Gửi dữ liệu cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CategoryService.update(id, category);
      alert("✅ Cập nhật danh mục thành công!");
      navigate("/admin/category");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật danh mục:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">✏️ Cập nhật danh mục</h4>
          <button
            onClick={() => navigate("/admin/category")}
            className="btn btn-light text-dark fw-bold"
          >
            ⬅ Quay lại
          </button>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center text-secondary py-5">
              ⏳ Đang tải dữ liệu...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Tên danh mục</label>
                <input
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <textarea
                  name="description"
                  value={category.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                />
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-warning text-white">
                  💾 Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/category")}
                  className="btn btn-secondary ms-2"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
