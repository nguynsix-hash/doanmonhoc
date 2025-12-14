import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Slidebar";
import Footer from "./Footer";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-white border-l border-gray-300 shadow-inner">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
