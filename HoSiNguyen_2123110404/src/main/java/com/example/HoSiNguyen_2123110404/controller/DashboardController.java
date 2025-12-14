package com.example.HoSiNguyen_2123110404.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping; // Dùng ProductDto
import org.springframework.web.bind.annotation.RequestMapping; // Dùng OrderResponse
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.HoSiNguyen_2123110404.dto.DailySalesDto;
import com.example.HoSiNguyen_2123110404.dto.DashboardKpiDto;
import com.example.HoSiNguyen_2123110404.dto.OrderResponse;
import com.example.HoSiNguyen_2123110404.dto.ProductDto;
import com.example.HoSiNguyen_2123110404.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    // API 1: Lấy các chỉ số KPI chính
    // URL: GET /api/admin/dashboard/kpis
    // Endpoint này sẽ hiển thị 4 thẻ số liệu lớn nhất
    @GetMapping("/kpis")
    public ResponseEntity<DashboardKpiDto> getKpis() {
        return ResponseEntity.ok(dashboardService.getDashboardKpis());
    }

    // API 2: Lấy dữ liệu doanh thu hàng ngày cho biểu đồ
    // URL: GET /api/admin/dashboard/sales-data?days=7
    // Mặc định trả về 7 ngày gần nhất nếu không có tham số days
    @GetMapping("/sales-data")
    public ResponseEntity<List<DailySalesDto>> getSalesData(@RequestParam(defaultValue = "7") int days) {
        return ResponseEntity.ok(dashboardService.getDailySalesData(days));
    }

    // API 3: Lấy 5 đơn hàng mới nhất
    // URL: GET /api/admin/dashboard/latest-orders
    // Repository đã cố định là Top 5
    @GetMapping("/latest-orders")
    public ResponseEntity<List<OrderResponse>> getLatestOrders() {
        return ResponseEntity.ok(dashboardService.getLatestOrders());
    }

    // API 4: Lấy sản phẩm sắp hết hàng (Low Stock)
    // URL: GET /api/admin/dashboard/low-stock-products
    // Repository đã cố định là Top 5 sản phẩm có quantity < 10
    @GetMapping("/low-stock-products")
    public ResponseEntity<List<ProductDto>> getLowStockProducts() {
        // Chúng ta gọi phương thức getLowStockProducts() không có tham số limit
        // vì Service và Repository đã cố định ngưỡng 10 và Top 5.
        return ResponseEntity.ok(dashboardService.getLowStockProducts());
    }
}