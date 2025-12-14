import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../../services/ProductServices";
import CategoryService from "../../../services/CategoryServices";
import BrandService from "../../../services/BrandServices";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    quantity: "",
    status: "ACTIVE",
    categoryId: "",
    brandId: "",
    image: null,
    previewImage: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load categories, brands và sản phẩm
        const [catData, brandData, product] = await Promise.all([
          CategoryService.getAll(),
          BrandService.getAll(),
          ProductService.getById(id)
        ]);

        setCategories(catData);
        setBrands(brandData);

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price !== undefined && product.price !== null ? String(product.price) : "",
          discountPrice: product.discountPrice !== undefined && product.discountPrice !== null ? String(product.discountPrice) : "",
          quantity: product.quantity !== undefined && product.quantity !== null ? String(product.quantity) : "",
          status: product.status || "ACTIVE",
          categoryId: product.categoryId ? String(product.categoryId) : "",
          brandId: product.brandId ? String(product.brandId) : "",
          image: null,
          previewImage: product.image || ""
        });
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu sản phẩm:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files[0],
        previewImage: URL.createObjectURL(e.target.files[0])
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🌟 THÊM XÁC THỰC GIÁ VÀ SỐ LƯỢNG KHÔNG ÂM
    const price = parseFloat(formData.price);
    const discountPrice = parseFloat(formData.discountPrice);
    const quantity = parseInt(formData.quantity);

    if (isNaN(price) || price < 0) {
      alert("❌ Giá phải là một số không âm.");
      return;
    }

    if (!isNaN(discountPrice) && discountPrice < 0) {
      alert("❌ Giá khuyến mãi phải là một số không âm hoặc để trống.");
      return;
    }
    
    // Thêm kiểm tra giá khuyến mãi không được lớn hơn giá gốc
    if (!isNaN(price) && !isNaN(discountPrice) && discountPrice > price) {
        alert("❌ Giá khuyến mãi không được lớn hơn giá gốc.");
        return;
    }


    if (!isNaN(quantity) && quantity < 0) {
      alert("❌ Số lượng phải là một số nguyên không âm hoặc để trống.");
      return;
    }
    // ----------------------------------------------------

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        // Loại trừ previewImage và chỉ gửi những trường có giá trị (không null, không rỗng)
        if (key !== "previewImage" && formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });
      
      // Xử lý giá trị discountPrice khi rỗng: không gửi lên để API có thể coi là null/default
      if (formData.discountPrice === "") {
        // Tùy thuộc vào backend, nếu API cần trường này có mặt (ví dụ: để đặt lại thành NULL), 
        // bạn có thể gửi một giá trị rỗng hoặc 0. Nếu không cần, thì giữ nguyên code trên.
        // Tôi sẽ không thêm trường này vào FormData nếu nó rỗng.
      }


      await ProductService.update(id, data);
      alert("✅ Cập nhật sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err) {
      console.error("❌ Lỗi cập nhật sản phẩm:", err);
      alert("❌ Cập nhật sản phẩm thất bại!");
    }
  };

  return (
    <div className="container py-4">
      <h3>✏️ Chỉnh sửa sản phẩm</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Giá</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              min="0" // 💡 Thêm thuộc tính min="0" cho UX tốt hơn
              required
            />
          </div>
          <div className="col">
            <label>Giá khuyến mãi</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              className="form-control"
              min="0" // 💡 Thêm thuộc tính min="0" cho UX tốt hơn
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Số lượng</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-control"
              min="0" // 💡 Thêm thuộc tính min="0" cho UX tốt hơn
            />
          </div>
          <div className="col">
            <label>Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="ACTIVE">Hiển thị</option>
              <option value="INACTIVE">Ẩn</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Danh mục</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map(c => (
                <option key={c.id} value={String(c.id)}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>Thương hiệu</label>
            <select
              name="brandId"
              value={formData.brandId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Chọn thương hiệu --</option>
              {brands.map(b => (
                <option key={b.id} value={String(b.id)}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label>Ảnh</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-control"
          />
          {formData.previewImage && (
            <img
              src={formData.previewImage}
              alt="Preview"
              className="mt-2"
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-warning">
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
}

export default EditProduct;