import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicServices from "../../../services/TopicSevices";

const TopicAdd = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState({
    name: "",
    description: "",
    status: true,
  
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "file") {
      setTopic({ ...topic, [name]: files[0] });
    } else {
      setTopic({ ...topic, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", topic.name);
    formData.append("description", topic.description);
    formData.append("status", topic.status ? 1 : 0); // ✅ PHP expects 0/1
    formData.append("created_by", 1); // hardcoded user ID
    formData.append("created_at", new Date().toISOString().slice(0, 19).replace("T", " "));


    try {
      const message = await TopicServices.create(formData);
      alert("✅ " + message);
      navigate("/admin/topic");
    } catch (err) {
      console.error("❌ Lỗi khi thêm:", err);
      alert("❌ Thêm thất bại: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">➕ Thêm chủ đề</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          value={topic.name}
          onChange={handleChange}
          placeholder="Tên chủ đề"
          required
          className="border px-4 py-2 rounded w-full"
        />

        <textarea
          name="description"
          value={topic.description}
          onChange={handleChange}
          placeholder="Mô tả"
          required
          className="border px-4 py-2 rounded w-full"
        />

       
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={topic.status}
            onChange={handleChange}
          />
          Hiển thị
        </label>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default TopicAdd;
