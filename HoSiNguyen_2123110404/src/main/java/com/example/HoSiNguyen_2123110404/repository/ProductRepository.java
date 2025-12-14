package com.example.HoSiNguyen_2123110404.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.HoSiNguyen_2123110404.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Integer categoryId);
    List<Product> findByBrandId(Long brandId);
    List<Product> findByCategoryIdAndBrandId(Integer categoryId, Long brandId);
    // 1. Đếm sản phẩm theo trạng thái
    Long countByStatus(String status);

    // 2. Lấy danh sách sản phẩm có số lượng thấp (cho cảnh báo)
    List<Product> findTop5ByQuantityLessThanOrderByQuantityAsc(Integer quantity);

    // ⭐ THÊM PHƯƠNG THỨC TÌM KIẾM TỔNG HỢP (dùng JPQL)
    @Query("SELECT p FROM Product p WHERE " +
           "(:categoryId IS NULL OR p.category.id = :categoryId) AND " +
           "(:brandId IS NULL OR p.brand.id = :brandId) AND " +
           "(:search IS NULL OR lower(p.name) LIKE lower(concat('%', :search, '%')))")
    List<Product> filterProducts(
            Integer categoryId,
            Long brandId,
            String search
    );
}
