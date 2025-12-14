import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import TopicServices from "../../../services/TopicSevices";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await TopicServices.list();
        if (Array.isArray(response)) {
          setTopics(response);
        } else {
          throw new Error("Dữ liệu trả về không hợp lệ");
        }
      } catch (err) {
        console.error("❌ Lỗi khi tải danh sách chủ đề:", err);
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá chủ đề này?")) {
      try {
        await TopicServices.delete(id);
        setTopics(topics.filter((topic) => topic.id !== id));
      } catch (error) {
        console.error("❌ Lỗi khi xoá chủ đề:", error);
        alert("❌ Không thể xoá chủ đề.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-indigo-800">📚 Danh sách chủ đề</h2>
          <NavLink
            to="/admin/topic/add"
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-semibold shadow hover:bg-indigo-700"
          >
            <FaPlus /> Thêm chủ đề
          </NavLink>
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto border border-gray-200">
          {loading ? (
            <p className="text-center p-6 text-gray-500 italic">⏳ Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="text-center p-6 text-red-600 italic">{error}</p>
          ) : (
            <table className="min-w-full text-gray-800 text-sm table-auto">
              <thead className="bg-indigo-100 text-left text-sm font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 border-b">ID</th>
                  <th className="px-4 py-3 border-b">Tên chủ đề</th>
                  <th className="px-4 py-3 border-b">Slug</th>
                  <th className="px-4 py-3 border-b">Mô tả</th>
                  <th className="px-4 py-3 border-b">Trạng thái</th>
                  <th className="px-4 py-3 border-b text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {topics.length > 0 ? (
                  topics.map((topic) => (
                    <tr
                      key={topic.id}
                      className="hover:bg-indigo-50 transition duration-150 text-center border-t"
                    >
                      <td className="px-4 py-3 border-b">{topic.id}</td>
                      <td className="px-4 py-3 border-b text-left">{topic.name}</td>
                      <td className="px-4 py-3 border-b text-left">{topic.slug}</td>
                      <td className="px-4 py-3 border-b text-left">{topic.description}</td>
                      <td className="px-4 py-3 border-b">
                        {topic.status == 1 || topic.status === "1" ? (
                          <span className="px-2 py-1 rounded text-xs font-semibold text-white bg-green-500">
                            Hiển thị
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded text-xs font-semibold text-white bg-gray-500">
                            Ẩn
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 border-b text-center whitespace-nowrap">
                        <NavLink
                          to={`/admin/topic/detail/${topic.id}`}
                          className="text-blue-600 hover:text-blue-800 mr-3 inline-flex items-center gap-1"
                          title="Xem chi tiết"
                        >
                          👁️ Xem
                        </NavLink>
                        <NavLink
                          to={`/admin/topic/edit/${topic.id}`}
                          className="text-yellow-600 hover:text-yellow-800 mr-3 inline-flex items-center gap-1"
                          title="Chỉnh sửa"
                        >
                          <FaEdit /> Sửa
                        </NavLink>
                        <button
                          onClick={() => handleDelete(topic.id)}
                          className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                          title="Xoá"
                        >
                          <FaTrash /> Xoá
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-6 italic text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicList;
