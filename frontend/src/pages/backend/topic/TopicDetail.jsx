import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import TopicServices from "../../../services/TopicSevices";

export default function TopicDetail() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const data = await TopicServices.row(id);
        if (data) {
          setTopic(data);
        } else {
          throw new Error("Không tìm thấy chủ đề");
        }
      } catch (err) {
        console.error("❌ Lỗi khi tải chủ đề:", err);
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-gray-600 italic">⏳ Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600 italic">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">📄 Chi tiết chủ đề</h2>
      <table className="table-auto w-full text-left text-sm text-gray-700">
        <tbody>
          <tr>
            <td className="font-semibold py-2 w-40">ID:</td>
            <td>{topic.id}</td>
          </tr>
          <tr>
            <td className="font-semibold py-2">Tên chủ đề:</td>
            <td>{topic.name}</td>
          </tr>
          <tr>
            <td className="font-semibold py-2">Slug:</td>
            <td>{topic.slug}</td>
          </tr>
          <tr>
            <td className="font-semibold py-2">Mô tả:</td>
            <td>{topic.description}</td>
          </tr>
          <tr>
            <td className="font-semibold py-2">Trạng thái:</td>
            <td>
              {topic.status === "1" || topic.status === 1 ? (
                <span className="px-2 py-1 rounded text-xs font-semibold text-white bg-green-500">
                  Hiển thị
                </span>
              ) : (
                <span className="px-2 py-1 rounded text-xs font-semibold text-white bg-gray-500">
                  Ẩn
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 flex gap-3">
        <NavLink
          to={`/admin/topic/edit/${topic.id}`}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          ✏️ Chỉnh sửa
        </NavLink>
        <NavLink
          to="/admin/topic"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          🔙 Quay lại danh sách
        </NavLink>
      </div>
    </div>
  );
}
