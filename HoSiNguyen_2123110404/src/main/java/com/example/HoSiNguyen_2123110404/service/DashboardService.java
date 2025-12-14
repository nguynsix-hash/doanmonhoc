package com.example.HoSiNguyen_2123110404.service;

import java.util.List;

import com.example.HoSiNguyen_2123110404.dto.DailySalesDto;
import com.example.HoSiNguyen_2123110404.dto.DashboardKpiDto; // DTO trả về cho Product
import com.example.HoSiNguyen_2123110404.dto.OrderResponse;    // DTO trả về cho Order
import com.example.HoSiNguyen_2123110404.dto.ProductDto;

public interface DashboardService {
    // 1. Lấy tất cả các chỉ số KPI
    DashboardKpiDto getDashboardKpis();

    // 2. Lấy dữ liệu doanh thu hàng ngày cho biểu đồ
    List<DailySalesDto> getDailySalesData(int days);

    // 3. Lấy các đơn hàng mới nhất (Không có tham số limit vì Repository đã dùng Top5)
    List<OrderResponse> getLatestOrders(); 

    // 4. Lấy sản phẩm sắp hết hàng (Giới hạn 5 sản phẩm như Repository)
    List<ProductDto> getLowStockProducts();
}