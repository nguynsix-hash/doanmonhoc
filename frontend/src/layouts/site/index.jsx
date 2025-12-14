import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Slide from "@/pages/frontend/home/Slide";

export default function UserLayout() {
  const location = useLocation();

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Nav />



  <main style={{ flexGrow: 1, width: "100%", padding: "0 40px", boxSizing: "border-box" }}>
  <Outlet />
</main>


      <Footer />
    </div>
  );
}
