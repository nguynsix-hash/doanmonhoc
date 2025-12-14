import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductService from "../../../services/ProductServices";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getById(id);
        setProduct(data);
      } catch (err) {
        console.error("❌ Lỗi tải sản phẩm:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="container py-4">Đang tải dữ liệu...</div>;

  return (
    <div className="container py-4">
      <h3>📦 Chi tiết sản phẩm</h3>
      <div className="card p-4">
        <div className="row mb-3">
          <div className="col-md-4 text-center">
            {product.image ? (
              <img
                src={product.image.startsWith("http") ? product.image : `http://localhost:8080${product.image}`}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            ) : (
              <span className="text-muted">Không có ảnh</span>
            )}
          </div>
          <div className="col-md-8">
            <h4 className="fw-bold">{product.name}</h4>
            <p>{product.description || "Không có mô tả"}</p>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Giá: </strong> {product.price?.toLocaleString()}₫
              </li>
              <li className="list-group-item">
                <strong>Giá khuyến mãi: </strong> {product.discountPrice?.toLocaleString() || "-"}₫
              </li>
              <li className="list-group-item">
                <strong>Số lượng: </strong> {product.quantity || "-"}
              </li>
              <li className="list-group-item">
                <strong>Danh mục: </strong> {product.categoryName || "-"}
              </li>
              <li className="list-group-item">
                <strong>Thương hiệu: </strong> {product.brandName || "-"}
              </li>
              <li className="list-group-item">
                <strong>Trạng thái: </strong>{" "}
                {product.status === "ACTIVE" ? (
                  <span className="badge bg-success">Hiển thị</span>
                ) : (
                  <span className="badge bg-secondary">Ẩn</span>
                )}
              </li>
              <li className="list-group-item">
                <strong>Ngày tạo: </strong>{" "}
                {product.createdAt ? new Date(product.createdAt).toLocaleString() : "-"}
              </li>
            </ul>

            <div className="mt-3">
              <Link to="/admin/product" className="btn btn-secondary">
                ⬅ Quay lại
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
