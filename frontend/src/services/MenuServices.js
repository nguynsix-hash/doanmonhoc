import { API_URL } from "./config";
import httpAxios from "./httpAxios";
import axios from "axios";

const menuServices = {
  list: async () => {
    const result = await httpAxios.get(API_URL + 'menu/read.php');
    // Nếu API trả về { menus: [...] }
    return result.menus;
  },
 
  listByPosition: async (position) => {
    const all = await menuServices.list();
    return all.filter((menu) => menu.position === position && menu.status === "1");
  },

  // Thêm các hàm khác nếu cần, ví dụ:
  getOne: async (id) => {
    const result = await httpAxios.get(API_URL + `menu/read_one.php?id=${id}`);
    return result;
  },
  
  create: async (formData) => {
    const res = await httpAxios.post(API_URL + "menu/create.php", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  update: async (id, data) => {
    const result = await httpAxios.post(API_URL + `menu/update.php?id=${id}`, data);
    return result;
  },
  
 
   delete: async (id) => {
    const res = await axios.delete(`${API_URL}/menu/delete.php?id=${id}`);
    return res.data;
  },

  getListByPosition: async (position, limit = 10) => {
    const result = await httpAxios.get(API_URL + `menu/getList.php?position=${position}&limit=${limit}`);
    return result.menus;
  }
};

export default menuServices;