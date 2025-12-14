package com.example.HoSiNguyen_2123110404.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.HoSiNguyen_2123110404.entity.OrderEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByUserId(Long userId);
    // 1. Đếm đơn hàng theo trạng thái
    Long countByStatus(String status);
    
    // 2. Tính tổng doanh thu theo trạng thái và thời gian
    @Query("SELECT SUM(o.totalAmount) FROM OrderEntity o WHERE o.status = :status AND o.createdAt BETWEEN :startDate AND :endDate")
    Double sumTotalAmountByStatusAndCreatedAtBetween(String status, LocalDateTime startDate, LocalDateTime endDate);

    // 3. Truy vấn tổng doanh thu theo ngày (dùng cho biểu đồ)
    @Query("SELECT DATE(o.createdAt), SUM(o.totalAmount) FROM OrderEntity o WHERE o.status = 'COMPLETED' AND o.createdAt >= :startDate GROUP BY DATE(o.createdAt) ORDER BY DATE(o.createdAt)")
    List<Object[]> findDailyCompletedSales(LocalDateTime startDate);
    
    // 4. Lấy các đơn hàng mới nhất
    List<OrderEntity> findTop5ByOrderByCreatedAtDesc();
}
