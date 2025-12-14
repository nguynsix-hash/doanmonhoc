import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../../services/ProductServices";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await ProductService.getAll();
      setProducts(data);
    } catch (err) {
      console.error("❌ Lỗi tải sản phẩm:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;

    try {
      await ProductService.remove(id);
      alert("✅ Xóa sản phẩm thành công!");
      loadProducts();
    } catch (err) {
      alert("❌ Xóa sản phẩm thất bại!");
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📦 Quản lý sản phẩm</h3>
        <Link to="/admin/product/add" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Thêm sản phẩm
        </Link>
      </div>

      <table className="table table-bordered table-hover text-center align-middle">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Giá KM</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Thương hiệu</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>
                  {p.image ? (
                    <img
                      src={p.image.startsWith("http") ? p.image : `http://localhost:8080${p.image}`}
                      alt={p.name}
                      width="70"
                      height="70"
                      style={{ objectFit: "cover", borderRadius: "8px", boxShadow: "0 0 4px rgba(0,0,0,0.2)" }}
                      onError={(e) => (e.target.src = "/no-image.png")}
                    />
                  ) : (
                    <span className="text-muted">No image</span>
                  )}
                </td>
                <td className="text-start fw-semibold">{p.name}</td>
                <td className="text-success fw-bold">{p.price?.toLocaleString()}₫</td>
                <td className="text-danger fw-bold">{p.discountPrice?.toLocaleString() || "-"}</td>
                <td>{p.quantity || "-"}</td>
                <td>{p.categoryName || "-"}</td>
                <td>{p.brandName || "-"}</td>
                <td>
                  {p.status === "ACTIVE" ? (
                    <span className="badge bg-success">Hiển thị</span>
                  ) : (
                    <span className="badge bg-secondary">Ẩn</span>
                  )}
                </td>
                <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Link to={`/admin/product/detail/${p.id}`} className="btn btn-sm btn-info" title="Chi tiết">
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link to={`/admin/product/edit/${p.id}`} className="btn btn-sm btn-warning" title="Chỉnh sửa">
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger" title="Xóa">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center py-4 text-muted">
                Không có sản phẩm nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
