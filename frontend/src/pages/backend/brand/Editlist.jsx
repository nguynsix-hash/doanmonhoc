import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BrandService from "../../../services/BrandServices";

function BrandEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    BrandService.get(id).then((data) => {
      setName(data.name);
      setDescription(data.description || "");
    }).catch(err => {
      console.error(err);
      alert("Không thể tải brand.");
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BrandService.update(id, { name, description, image });
      alert("Cập nhật brand thành công!");
      navigate("/admin/brand");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật brand.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">✏️ Sửa Thương hiệu</h2>
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
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default BrandEdit;
