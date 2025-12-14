package com.example.HoSiNguyen_2123110404.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList; // Dùng ProductDto
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.HoSiNguyen_2123110404.dto.DailySalesDto;
import com.example.HoSiNguyen_2123110404.dto.DashboardKpiDto;
import com.example.HoSiNguyen_2123110404.dto.OrderResponse;
import com.example.HoSiNguyen_2123110404.dto.ProductDto;
import com.example.HoSiNguyen_2123110404.mapper.OrderMapper;
import com.example.HoSiNguyen_2123110404.mapper.ProductMapper;
import com.example.HoSiNguyen_2123110404.repository.OrderRepository;
import com.example.HoSiNguyen_2123110404.repository.ProductRepository;
import com.example.HoSiNguyen_2123110404.service.DashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final ProductMapper productMapper;

    private static final int KPI_DAYS = 30;
    private static final String COMPLETED_STATUS = "COMPLETED";
    private static final String PENDING_STATUS = "PENDING";
    private static final String ACTIVE_STATUS = "ACTIVE";
    private static final int LOW_STOCK_THRESHOLD = 10; // Ngưỡng cảnh báo tồn kho thấp

    @Override
    @Transactional(readOnly = true)
    public DashboardKpiDto getDashboardKpis() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDate = now.minusDays(KPI_DAYS);
        
        // 1. Tổng Doanh Thu
        Double totalRevenue = orderRepository.sumTotalAmountByStatusAndCreatedAtBetween(COMPLETED_STATUS, startDate, now);
        
        // 2. Tổng số đơn hàng (Tổng cộng trong DB)
        Long totalOrders = orderRepository.count();
        
        // 3. Đơn hàng Đang Chờ
        Long pendingOrders = orderRepository.countByStatus(PENDING_STATUS);
        
        // 4. Sản phẩm Đang Hoạt Động
        Long activeProducts = productRepository.countByStatus(ACTIVE_STATUS);

        return DashboardKpiDto.builder()
                .totalRevenue(totalRevenue != null ? totalRevenue : 0.0)
                .totalOrders(totalOrders)
                .pendingOrders(pendingOrders)
                .activeProducts(activeProducts)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<DailySalesDto> getDailySalesData(int days) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        List<Object[]> results = orderRepository.findDailyCompletedSales(startDate);
        
        List<DailySalesDto> salesData = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Object[] result : results) {
            String date = ((java.sql.Date) result[0]).toLocalDate().format(formatter); 
            Double sales = (Double) result[1];
            salesData.add(new DailySalesDto(date, sales));
        }
        return salesData;
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getLatestOrders() {
        // Sử dụng ::toResponse (giả định OrderMapper dùng toResponse)
        return orderRepository.findTop5ByOrderByCreatedAtDesc().stream()
            .map(orderMapper::toResponse) 
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    // FIX 1: Đổi kiểu trả về thành List<ProductDto>
    public List<ProductDto> getLowStockProducts() {
        // Sử dụng ngưỡng tồn kho và phương thức findTop5 đã có trong Repository
        return productRepository.findTop5ByQuantityLessThanOrderByQuantityAsc(LOW_STOCK_THRESHOLD).stream()
            // FIX 2: Thay thế toResponse bằng toDto để khớp với ProductMapper của bạn
            .map(productMapper::toDto) 
            .collect(Collectors.toList());
    }
}