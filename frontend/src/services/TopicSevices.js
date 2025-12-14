import { API_URL } from "./config";
import httpAxios from "./httpAxios";

const TopicServices = {
  // Lấy danh sách chủ đề
  list: async () => {
    const res = await httpAxios.get(API_URL + "topic/read.php");
    return res.topics || [];
  },

  // Lấy chi tiết một chủ đề theo ID
  row: async (id) => {
    const res = await httpAxios.get(API_URL + `topic/read_one.php?id=${id}`);
    return res.topic;
  },

  // Tạo mới chủ đề
  create: async (formData) => {
    const res = await httpAxios.post(API_URL + "topic/create.php", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Cập nhật chủ đề
  update: async (id, formData) => {
    formData.append("id", id); // ⭐ THÊM ID vào formData
    const res = await httpAxios.post(API_URL + "topic/update.php", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Xoá chủ đề
  delete: async (id) => {
  const response = await httpAxios.post("topic/delete.php", { id: id });
  return response.data;
},
};

export default TopicServices;
