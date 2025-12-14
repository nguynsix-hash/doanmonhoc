// import React, { useEffect, useState } from "react";
// import productServices from "../services/ProductServices";
// import { IMG_URL } from "../services/config";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "@/contexts/CartContext";

// const ProductCard = ({ type = "new", limit = 9 }) => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();
//   const { addToCart } = useCart(); // ✅ lấy hàm addToCart từ context

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const data =
//           type === "new"
//             ? await productServices.getNew(limit)
//             : await productServices.getSale(limit);
//         setProducts(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("❌ Lỗi tải sản phẩm:", err);
//       }
//     };
//     fetch();
//   }, [type, limit]);

//   const getImageSrc = (thumbnail) => {
//     if (!thumbnail) return "/images/no-image.png";
//     if (thumbnail.startsWith("http")) return thumbnail;
//     return `${IMG_URL}product/${thumbnail}`;
//   };

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
//   };

//   return (
//     <div className="py-12 px-6 min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200">
//       <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-rose-600 uppercase tracking-wide">
//         {type === "new" ? "Sản phẩm mới" : "Ưu đãi đặc biệt"}
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {products.length === 0 ? (
//           <div className="col-span-full text-center text-gray-500 text-lg">
//             Không có sản phẩm để hiển thị.
//           </div>
//         ) : (
//           products.map((p) => (
//             <div
//               key={p.id}
//               className="group relative flex flex-col border border-blue-100 rounded-3xl overflow-hidden bg-white shadow hover:shadow-xl transition duration-300 hover:-translate-y-1 cursor-pointer"
//               style={{ minHeight: 460 }}
//             >
//               {type === "new" ? (
//                 <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
//                   Mới
//                 </span>
//               ) : p.price_sale > 0 ? (
//                 <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
//                   Giảm giá
//                 </span>
//               ) : null}

//               <div className="h-56 overflow-hidden">
//                 <img
//                   src={getImageSrc(p.thumbnail)}
//                   alt={p.name}
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/images/no-image.png";
//                   }}
//                 />
//               </div>

//               <div className="p-5 flex flex-col items-center text-center flex-grow">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 min-h-[48px] group-hover:text-blue-600 transition-colors duration-300">
//                   {p.name}
//                 </h3>

//                 {p.price_sale > 0 ? (
//                   <div className="mb-4">
//                     <span className="text-sm text-gray-400 line-through mr-2">
//                       {Number(p.price_buy).toLocaleString("vi-VN")}₫
//                     </span>
//                     <span className="text-xl font-bold text-rose-600">
//                       {Number(p.price_sale).toLocaleString("vi-VN")}₫
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="mb-4">
//                     <span className="text-xl font-bold text-rose-600">
//                       {Number(p.price_buy).toLocaleString("vi-VN")}₫
//                     </span>
//                   </div>
//                 )}

//                 <div className="flex gap-3 mt-auto">
//                   <button
//                     onClick={() => navigate(`/san-pham/${p.id}`)}
//                     className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow transition-all duration-300"
//                   >
//                     Xem chi tiết
//                   </button>

//                   <button
//                     onClick={() => handleAddToCart(p)}
//                     className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium shadow transition-all duration-300"
//                   >
//                     Thêm giỏ hàng
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
