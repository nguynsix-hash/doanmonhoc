package com.example.HoSiNguyen_2123110404.dto;

import lombok.Builder;
import lombok.Data;

// DTO chứa 4 chỉ số KPI chính
@Data
@Builder
public class DashboardKpiDto {
    // Tổng Doanh Thu (từ đơn hàng COMPLETED)
    private Double totalRevenue;

    // Tổng số đơn hàng
    private Long totalOrders;

    // Số đơn hàng đang chờ xử lý
    private Long pendingOrders;

    // Tổng số sản phẩm đang hoạt động
    private Long activeProducts;
}