import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandService from "../../../services/BrandServices";

function BrandAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BrandService.create({ name, description, image });
      alert("Thêm brand thành công!");
      navigate("/admin/brand");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm brand.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">+ Thêm Thương hiệu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tên brand</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium">Hình ảnh</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Thêm Brand
        </button>
      </form>
    </div>
  );
}

export default BrandAdd;
