import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import MenuServices from '../../../services/MenuServices';
import { IMG_URL } from '../../../services/config';

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const location = useLocation();

  const fetchMenus = async () => {
    try {
      const data = await MenuServices.list();
      setMenus(data);
    } catch (error) {
      console.error("Lỗi khi tải menu:", error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    if (location.state?.updated) {
      fetchMenus();
      window.history.replaceState({}, document.title); // xóa trạng thái tránh reload lại
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xoá menu này?')) {
      try {
        await MenuServices.delete(id);
        setMenus(menus.filter(menu => menu.id !== id));
      } catch (error) {
        console.error("Lỗi xoá menu:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-green-800">📋 Danh sách Menu</h2>
          <NavLink
            to="/admin/menu/add"
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-md text-sm font-semibold shadow hover:bg-green-700"
          >
            <FaPlus /> Thêm Menu
          </NavLink>
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto border border-gray-200">
          <table className="min-w-full text-sm text-gray-800 table-auto">
            <thead className="bg-green-100 text-left text-sm font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b">ID</th>
                <th className="px-4 py-3 border-b">Tên menu</th>
                <th className="px-4 py-3 border-b">Đường dẫn</th>
                <th className="px-4 py-3 border-b">Vị trí</th>
                <th className="px-4 py-3 border-b">Loại</th>
                <th className="px-4 py-3 border-b text-center">Hình ảnh</th>
                <th className="px-4 py-3 border-b">Mô tả</th>
                <th className="px-4 py-3 border-b">Trạng thái</th>
                <th className="px-4 py-3 border-b text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id} className="hover:bg-green-50 transition duration-150">
                  <td className="px-4 py-3 border-b">{menu.id}</td>
                  <td className="px-4 py-3 border-b font-medium">{menu.name}</td>
                  <td className="px-4 py-3 border-b text-blue-600">{menu.link}</td>
                  <td className="px-4 py-3 border-b">{menu.position}</td>
                  <td className="px-4 py-3 border-b">{menu.type}</td>
                  <td className="px-4 py-3 border-b text-center">
                    {menu.thumbnail ? (
                      <img
                        src={`${IMG_URL}/menu/${menu.thumbnail}`}
                        alt={menu.name}
                        className="w-14 h-14 object-cover mx-auto rounded shadow"
                      />
                    ) : (
                      <span className="text-gray-400 italic">Không ảnh</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b">{menu.description}</td>
                  <td className="px-4 py-3 border-b">
                    {menu.status === 1 || menu.status === '1' ? (
                      <span className="bg-green-200 text-green-800 px-3 py-1 text-xs rounded-full font-medium">
                        Hiển thị
                      </span>
                    ) : (
                      <span className="bg-gray-300 text-gray-700 px-3 py-1 text-xs rounded-full font-medium">
                        Ẩn
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b text-center whitespace-nowrap">
                    <NavLink
                      to={`/admin/menu/detail/${menu.id}`}
                      className="text-blue-600 hover:text-blue-800 mr-3 inline-flex items-center gap-1"
                    >
                      👁️ Xem
                    </NavLink>
                    <NavLink
                      to={`/admin/menu/edit/${menu.id}`}
                      className="text-yellow-600 hover:text-yellow-800 mr-3 inline-flex items-center gap-1"
                    >
                      <FaEdit /> Sửa
                    </NavLink>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                    >
                      <FaTrash /> Xoá
                    </button>
                  </td>
                </tr>
              ))}
              {menus.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-6 italic text-gray-500">
                    Không có menu nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
