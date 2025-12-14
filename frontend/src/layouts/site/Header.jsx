import React from "react";

export default function Header() {
  return (
    <header
      style={{
        // Nền gradient xanh lá hiện đại hơn
        background: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)", 
        color: "#FFFFFF", // Màu chữ trắng
        padding: "20px 40px", // Đệm lớn hơn cho không gian thoáng đãng
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Đổ bóng sâu hơn, rõ nét hơn
        borderRadius: "0 0 10px 10px", // Bo tròn nhẹ góc dưới
        
        // Sử dụng Flexbox để căn chỉnh nội dung
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 
        style={{ 
          fontSize: "42px", // Kích thước chữ to hơn cho tiêu đề
          fontWeight: 700, // Chữ đậm
          margin: "0 0 8px 0", // Bỏ margin mặc định và thêm margin dưới
          letterSpacing: "2px", // Tăng khoảng cách chữ cho tiêu đề
        }}
      >
        🏸 SHOP CẦU LÔNG</h1>
      <div 
        style={{ 
          fontSize: "20px", 
          opacity: 0.9, // Giảm độ mờ nhẹ để tạo sự tương phản với tiêu đề
          fontStyle: "italic", // Chữ nghiêng nhẹ
        }}
      >
        Nơi hội tụ trang thiết bị cầu lông chất lượng!
      </div>
    </header>
  );
}