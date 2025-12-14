import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineViewCarousel,
  MdCategory,
  MdLocalOffer,
  MdContactMail,
  MdOutlineShoppingBag,
  MdOutlineArticle,
  MdOutlineInventory,
  MdPeopleAlt,
} from "react-icons/md";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: MdDashboard },
    { name: "Banner", path: "/admin/banner", icon: MdOutlineViewCarousel },
    { name: "Category", path: "/admin/category", icon: MdCategory },
    { name: "Brand", path: "/admin/brand", icon: MdLocalOffer },
    { name: "Contact", path: "/admin/contact", icon: MdContactMail },
    { name: "Order", path: "/admin/order", icon: MdOutlineShoppingBag },
    { name: "Post", path: "/admin/post", icon: MdOutlineArticle },
    { name: "Product", path: "/admin/product", icon: MdOutlineInventory },
    { name: "User", path: "/admin/user", icon: MdPeopleAlt },
  ];

  const baseClasses =
    "flex items-center space-x-3 px-4 py-3 mx-3 my-1 rounded-xl transition-all duration-200 ease-in-out text-base";
  const hoverClasses = "hover:bg-blue-500/10 hover:text-blue-600";
  const activeClasses =
    "bg-blue-600 text-white shadow-lg shadow-blue-500/50 font-medium";
  const inactiveClasses = "text-gray-700";

  return (
    <aside className="w-64 min-h-screen bg-white shadow-2xl border-r border-gray-100 sticky top-0 overflow-y-auto">
      {/* Header/Logo Section */}
      <div className="p-5 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-wider">
          <span className="text-gray-800">ADMIN</span> PANEL
        </h1>
        <p className="text-sm text-gray-500 mt-1">QUẢN TRỊ HỆ THỐNG</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${
                  isActive ? "" : hoverClasses
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Optional: Footer/Version Info */}
      <div className="p-4 mt-auto border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">Version 1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;