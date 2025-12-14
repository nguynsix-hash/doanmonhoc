// src/pages/admin/category/DetailCategory.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryService from "../../../services/CategoryServices";

function DetailCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Lấy dữ liệu danh mục theo ID
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

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📄 Chi tiết danh mục</h4>
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
          ) : !category ? (
            <div className="text-center text-muted py-5 fst-italic">
              ❌ Không tìm thấy danh mục.
            </div>
          ) : (
            <div className="p-3">
              <table className="table table-bordered align-middle">
                <tbody>
                  <tr>
                    <th style={{ width: "200px" }}>🆔 Mã danh mục</th>
                    <td>{category.id}</td>
                  </tr>
                  <tr>
                    <th>📛 Tên danh mục</th>
                    <td className="fw-semibold">{category.name}</td>
                  </tr>
                  <tr>
                    <th>📝 Mô tả</th>
                    <td>{category.description || "— Không có mô tả —"}</td>
                  </tr>
                  <tr>
                    <th>📅 Ngày tạo</th>
                    <td>{category.created_at || "—"}</td>
                  </tr>
                  <tr>
                    <th>🕒 Cập nhật gần nhất</th>
                    <td>{category.updated_at || "—"}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-end mt-4">
                <button
                  onClick={() => navigate(`/admin/category/edit/${category.id}`)}
                  className="btn btn-warning text-white me-2"
                >
                  ✏️ Chỉnh sửa
                </button>
                <button
                  onClick={() => navigate("/admin/category")}
                  className="btn btn-secondary"
                >
                  🔙 Quay lại danh sách
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailCategory;
