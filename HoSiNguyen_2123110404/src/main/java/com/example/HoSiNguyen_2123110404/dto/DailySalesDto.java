package com.example.HoSiNguyen_2123110404.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO dùng để vẽ biểu đồ Doanh thu theo ngày
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailySalesDto { // Tên lớp là DailySalesDto
    private String date; 
    private Double totalSales; // Kiểu dữ liệu là Double
}