package com.example.HoSiNguyen_2123110404.service;

import java.util.List;
import java.util.Optional;

import com.example.HoSiNguyen_2123110404.entity.Product;

public interface ProductService {
    List<Product> getAll();
    Optional<Product> getById(Long id);
    Product save(Product product);
    void delete(Long id);

    // --- Thêm các method filter ---
    List<Product> getByCategory(Integer categoryId);
    List<Product> getByBrand(Long brandId);
    List<Product> getByCategoryAndBrand(Integer categoryId, Long brandId);
    // ⭐ THÊM METHOD TÌM KIẾM TỔNG HỢP
    List<Product> filter(Integer categoryId, Long brandId, String search);
}
