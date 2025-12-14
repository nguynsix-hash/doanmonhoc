import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaBars, FaBell } from "react-icons/fa";

// Thêm prop onMenuToggle nếu bạn muốn kết nối với Sidebar
const Header = ({ onMenuToggle }) => { 
  const [admin, setAdmin] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load Admin data và xử lý chuyển hướng
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminUser"));
    if (adminData) setAdmin(adminData);
    else navigate("/admin/login");
  }, [navigate]);

  // Logic đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setAdmin(null);
    navigate("/admin/login");
  };

  /**
   * Logic AVATAR: Xử lý đường dẫn và Fallback (Giữ nguyên logic đã fix)
   */
  const renderAvatar = () => {
    // Nếu không có admin hoặc avatar, hiển thị icon fallback
    if (!admin || !admin.avatar) {
      return (
        <FaUserCircle size={32} className="text-gray-500 fallback-icon" />
      );
    }
    
    // Xử lý đường dẫn
    const avatarSrc = admin.avatar.startsWith('http') 
        ? admin.avatar 
        : `http://localhost${admin.avatar}`;

    return (
      <img
        src={avatarSrc}
        alt="Admin Avatar"
        // Thay đổi size và border để phù hợp với tông tối
        className="w-8 h-8 rounded-full object-cover border-2 border-green-400 shadow-md transition-transform duration-200 hover:scale-105"
        onError={(e) => {
          e.currentTarget.onerror = null; 
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.parentNode.querySelector('.fallback-icon');
          if (fallback) fallback.style.display = 'block';
        }}
      />
    );
  };

  return (
    // Sử dụng tông màu Dark Blue/Charcoal (ví dụ: bg-gray-800 hoặc bg-blue-900)
    <header className="flex justify-between items-center px-8 py-3 bg-gray-800 text-white shadow-xl sticky top-0 z-50 border-b border-gray-700">
      
      {/* 1. Logo & Menu Toggle */}
      <div className="flex items-center gap-6">
        {/* Nút Toggle cho Sidebar */}
        <button 
          onClick={onMenuToggle} 
          className="text-gray-300 p-2 rounded-lg hover:bg-gray-700 transition lg:hidden focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <FaBars size={20} />
        </button>

        <h1 className="text-2xl font-black tracking-wider text-green-400">
          <Link to="/admin" className="hover:text-green-300 transition">
            6789 SAN BANG TAT CA
          </Link>
        </h1>
      </div>

      {/* 2. User Info & Actions */}
      {admin && (
        <div className="flex items-center gap-4">
          
          {/* Notifications */}
          <button className="text-gray-300 p-2 rounded-full hover:bg-gray-700 transition relative focus:outline-none focus:ring-2 focus:ring-green-400">
             <FaBell size={20} />
             {/* Ví dụ: có thông báo mới */}
             <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 border border-gray-800"></span>
          </button>

          {/* User Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              // Thay đổi button style: Dark background, Green highlight
              className="flex items-center gap-2 bg-gray-700 p-1 pr-3 rounded-full cursor-pointer hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <div className="flex items-center justify-center">
                {renderAvatar()}
              </div>
              
              <span className="font-semibold text-sm text-gray-100 hidden sm:block">{admin.name}</span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div 
                // Sử dụng tông tối cho dropdown
                className="absolute right-0 mt-3 w-56 bg-gray-700 text-white rounded-xl shadow-2xl overflow-hidden border border-gray-600 z-50 animate-fade-in-down"
              >
                <div className="px-4 py-3 text-sm font-medium border-b border-gray-600">
                  <p className="font-bold text-green-400 truncate">{admin.name}</p>
                  <p className="text-gray-400 text-xs truncate">{admin.email || "Admin"}</p>
                </div>

                <Link 
                  to="/admin/profile" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-600 transition text-sm"
                >
                  <FaUserCircle className="text-green-400" /> Hồ sơ cá nhân
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-red-700/50 transition text-sm border-t border-gray-600 text-red-400"
                >
                  <FaSignOutAlt /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;