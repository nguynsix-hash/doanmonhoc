import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext"; // ✅ Import CartProvider
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>      {/* ✅ Thêm vào */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
