import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../services/ProductServices";
import CategoryService from "../../../services/CategoryServices";
import BrandService from "../../../services/BrandServices";

function AddProduct() {
  const navigate = useNavigate();
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
    image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catData, brandData] = await Promise.all([
          CategoryService.getAll(),
          BrandService.getAll()
        ]);
        setCategories(catData);
        setBrands(brandData);
      } catch (err) {
        console.error("❌ Lỗi tải categories/brands:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });

      await ProductService.create(data);
      alert("✅ Thêm sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err) {
      console.error("❌ Lỗi thêm sản phẩm:", err);
      alert("❌ Thêm sản phẩm thất bại!");
    }
  };

  return (
    <div className="container py-4">
      <h3>➕ Thêm sản phẩm</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên sản phẩm</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Mô tả</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" />
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
              required 
              min="0" // Đã thêm: Giá không được âm
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
              min="0" // Đã thêm: Giá không được âm
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
              min="0" // Đã thêm: Số lượng không được âm
            />
          </div>
          <div className="col">
            <label>Trạng thái</label>
            <select name="status" value={formData.status} onChange={handleChange} className="form-select">
              <option value="ACTIVE">Hiển thị</option>
              <option value="INACTIVE">Ẩn</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Danh mục</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="form-select" required>
              <option value="">-- Chọn danh mục --</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="col">
            <label>Thương hiệu</label>
            <select name="brandId" value={formData.brandId} onChange={handleChange} className="form-select" required>
              <option value="">-- Chọn thương hiệu --</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label>Ảnh</label>
          <input type="file" name="image" onChange={handleFileChange} className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">Thêm sản phẩm</button>
      </form>
    </div>
  );
}

export default AddProduct;