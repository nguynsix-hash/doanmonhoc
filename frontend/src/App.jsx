import React from "react";
import { Routes, Route } from "react-router-dom";
import siteRoutes from "./routes/siteRoute";
import SiteLayout from "./layouts/site";
import adminRoutes from "./routes/adminRoute.jsx";
import DashboardLayout from "./layouts/admin";

// Import thêm
import Login from "./pages/backend/login";
import Logout from "./pages/backend/logout";

export default function App() {
  return (
    <Routes>
      {/* Giao diện người dùng */}
      <Route path="/" element={<SiteLayout />}>
        {siteRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={<route.element />} />
        ))}
      </Route>

      {/* Admin login & logout */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/logout" element={<Logout />} />

      {/* Giao diện admin, có check login */}
      <Route path="/admin" element={<DashboardLayout />}>
        {adminRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
