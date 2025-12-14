import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopicServices from "../../../services/TopicSevices";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: 1,
  
  });
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const topic = await TopicServices.row(id);
      setForm({
        name: topic.name,
        description: topic.description,
        status: topic.status,
       
      });
      setCurrentImage(topic.thumbnail);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, thumbnail: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("status", form.status);
    if (form.thumbnail) {
      formData.append("thumbnail", form.thumbnail);
    }

    try {
      await TopicServices.update(id, formData);
      alert("✅ Cập nhật thành công!");
      navigate("/admin/topic");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật:", error);
      alert("❌ Cập nhật thất bại!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa chủ đề</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" value={form.name} className="border p-2 mb-2 w-full" onChange={handleChange} required />
        <textarea name="description" value={form.description} className="border p-2 mb-2 w-full" onChange={handleChange} required></textarea>
        <select name="status" value={form.status} className="border p-2 mb-2 w-full" onChange={handleChange}>
          <option value={1}>Hiển thị</option>
          <option value={0}>Ẩn</option>
        </select>
        {currentImage && (
          <img src={`http://localhost/PHPAPI/assets/topic/${currentImage}`} alt="Current" className="w-32 mb-2" />
        )}
       
        <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4 rounded">Cập nhật</button>
      </form>
    </div>
  );
};

export default Edit;
