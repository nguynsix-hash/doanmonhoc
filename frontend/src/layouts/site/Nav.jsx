import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaUserCircle } from "react-icons/fa"; // Thêm FaUserCircle
import { useCart } from "@/contexts/CartContext";

export default function Nav() {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const inputRef = useRef();
  const userMenuRef = useRef();
  const navigate = useNavigate();
  const { cartCount, clearCart } = useCart();

  const mainMenus = [
    { id: 1, name: "Trang chủ", link: "/" },
    { id: 2, name: "Sản phẩm", link: "/san-pham" },
    { id: 3, name: "Bài viết", link: "/bai-viet" }, // đổi từ Tin tức
    { id: 4, name: "Liên hệ", link: "/lien-he" },
  ];

  useEffect(() => {
    // Lắng nghe click bên ngoài để đóng search history và user menu
    const handleClickOutside = (event) => {
      // Đóng Search History
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowHistory(false);
      }
      // Đóng User Menu
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const stored = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(stored);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      let newHistory = history.filter(item => item !== search.trim());
      newHistory.unshift(search.trim());
      if (newHistory.length > 5) newHistory.pop();
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      setHistory(newHistory);
      navigate(`/san-pham?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setShowHistory(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    clearCart();
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <nav className="bg-white p-4 flex flex-wrap gap-4 justify-center shadow-md rounded-b-lg items-center">
      {/* Main menu */}
      {mainMenus.map((menu) => (
        <NavLink
          key={menu.id}
          to={menu.link}
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition block ${
              isActive ? "bg-green-600 text-white" : "text-green-700 hover:bg-green-100"
            }`
          }
        >
          {menu.name}
        </NavLink>
      ))}

      {/* Search */}
      <div ref={inputRef} className="relative ml-4">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm vợt, giày..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowHistory(true)}
            className="border border-green-500 rounded-full px-3 py-1 outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700 transition">
            Tìm
          </button>
        </form>

        {/* Lịch sử tìm kiếm */}
        {showHistory && history.length > 0 && (
          <ul className="absolute bg-white border border-gray-200 rounded shadow-lg mt-1 w-full min-w-[200px] z-50 max-h-60 overflow-y-auto">
            {history.map((item, idx) => (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm truncate"
                onClick={() => {
                  navigate(`/san-pham?search=${encodeURIComponent(item)}`);
                  setShowHistory(false);
                  setSearch("");
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cart */}
      <button onClick={() => navigate("/gio-hang")} className="relative ml-3 text-green-700 hover:text-green-600 transition">
        <FaShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
            {cartCount}
          </span>
        )}
      </button>

      {/* User */}
      <div ref={userMenuRef} className="relative ml-3 text-green-700 cursor-pointer">
        <div onClick={() => setShowUserMenu(!showUserMenu)} className="hover:text-green-600 transition">
          {/* LOGIC AVATAR ĐÃ ĐƯỢC FIX Ở ĐÂY */}
          {user?.avatar ? (
            <img
              // Bỏ http://localhost để đồng bộ với component Profile
              src={user.avatar} 
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
              onError={(e) => {
                // Xử lý khi ảnh lỗi, dùng FaUserCircle thay thế
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = 'none'; // Ẩn thẻ <img> lỗi
                const userIcon = e.currentTarget.parentNode.querySelector('.fallback-icon');
                if (userIcon) userIcon.style.display = 'block'; // Hiển thị fallback
              }}
            />
          ) : (
            <FaUser size={24} className="fallback-icon" />
          )}
        </div>
        
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-xl z-50 overflow-hidden">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                  {/* Hiển thị Avatar hoặc FaUserCircle trong menu dropdown */}
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                      onError={(e) => {
                        // Xử lý khi ảnh lỗi, dùng FaUserCircle thay thế
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.display = 'none'; // Ẩn thẻ <img> lỗi
                        const userIcon = e.currentTarget.parentNode.querySelector('.fallback-icon-menu');
                        if (userIcon) userIcon.style.display = 'block'; // Hiển thị fallback
                      }}
                    />
                  ) : (
                    <FaUserCircle size={40} className="text-gray-400 fallback-icon-menu" />
                  )}
                  
                  <div>
                    <p className="font-bold text-gray-800 truncate">{user.name}</p>
                    <p className="text-gray-500 text-xs truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate("/thong-tin");
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition flex items-center"
                >
                  Thông tin
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 transition flex items-center border-t border-gray-100"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/dang-nhap");
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    navigate("/dang-ky");
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Đăng ký
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}