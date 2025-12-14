// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // Import các icons bạn muốn sử dụng
// import { FaMobileAlt, FaLaptop, FaHeadphonesAlt, FaCamera } from 'react-icons/fa';
// import { IoMdWatch } from 'react-icons/io'; // Đúng gói cho IoMdWatch

// export default function CategoryList({ onSelectCategory }) { // Thêm prop onSelectCategory
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost/PHPAPI/api/category/read.php")
//       .then((res) => {
//         if (res.data && Array.isArray(res.data.categorys)) {
//           setCategories(res.data.categorys);
//         } else {
//           setCategories([]);
//           console.warn("Không có danh sách danh mục hợp lệ trong response.");
//         }
//       })
//       .catch((err) => {
//         console.error("❌ Lỗi tải danh mục:", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   // Hàm để ánh xạ tên danh mục với icon
//   const getCategoryIcon = (categoryName) => {
//     switch (categoryName.toLowerCase()) {
//       case 'điện thoại':
//         return <FaMobileAlt />;
//       case 'laptop':
//         return <FaLaptop />;
//       case 'phụ kiện':
//         return <FaHeadphonesAlt />; // Hoặc icon phù hợp hơn cho phụ kiện
//       case 'đồng hồ thông minh':
//         return <IoMdWatch />; // Sử dụng IoMdWatch
//       case 'máy ảnh':
//         return <FaCamera />;
//       // Thêm các trường hợp khác cho danh mục của bạn
//       default:
//         return '📦'; // Icon mặc định nếu không khớp
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg mt-8">
//       <h2 className="text-3xl font-bold mb-8 text-center text-green-700 uppercase tracking-wider">
//         Danh mục sản phẩm
//       </h2>

//       {loading ? (
//         <div className="text-center text-gray-500 p-6">Đang tải dữ liệu...</div>
//       ) : categories.length === 0 ? (
//         <div className="text-center text-gray-500 p-6">Không có dữ liệu.</div>
//       ) : (
//         <div className="flex overflow-x-auto pb-4 space-x-4 px-2
//                       scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-green-400 scrollbar-thumb-rounded"> {/* Thêm tùy chỉnh scrollbar */}
          
//           {/* Mục "Tất cả" */}
//           <div
//             className="flex-none min-w-[150px] bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 p-4 flex flex-col items-center justify-center text-center border border-green-300 cursor-pointer"
//             onClick={() => onSelectCategory(null)} // Khi click "Tất cả", truyền null hoặc giá trị đặc biệt
//           >
//             <div className="text-4xl text-green-600 mb-2">
//               <FaLaptop /> {/* Icon chung hoặc icon "tất cả" */}
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800">Tất cả</h3>
//           </div>

//           {categories.map((cat) => (
//             <div
//               key={cat.id}
//               className="flex-none min-w-[150px] bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 p-4 flex flex-col items-center justify-center text-center border border-green-200 cursor-pointer"
//               onClick={() => onSelectCategory(cat.id)} // Truyền ID danh mục khi click
//             >
//               <div className="text-4xl text-green-600 mb-2">
//                 {getCategoryIcon(cat.name)} {/* Hiển thị icon */}
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }