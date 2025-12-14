import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart từ localStorage khi mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  // Đồng bộ cart vào localStorage và count
  const syncCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
  };

  const addToCart = (product) => {
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    let updatedCart = [...cartItems];

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: product.id,
        name: product.name,
        price: product.price_sale > 0 ? product.price_sale : product.price,
        image: product.thumbnail,
        quantity: 1,
      });
    }

    syncCart(updatedCart);
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    syncCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    syncCart(updatedCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setCartCount(0);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
