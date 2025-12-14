package com.example.HoSiNguyen_2123110404.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.HoSiNguyen_2123110404.entity.Product;
import com.example.HoSiNguyen_2123110404.repository.ProductRepository;
import com.example.HoSiNguyen_2123110404.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    // --- Implement filter methods ---
    @Override
    public List<Product> getByCategory(Integer categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Product> getByBrand(Long brandId) {
        return productRepository.findByBrandId(brandId);
    }

    @Override
    public List<Product> getByCategoryAndBrand(Integer categoryId, Long brandId) {
        return productRepository.findByCategoryIdAndBrandId(categoryId, brandId);
    }
    // ⭐ TRIỂN KHAI METHOD TÌM KIẾM TỔNG HỢP
    @Override
    public List<Product> filter(Integer categoryId, Long brandId, String search) {
        // Nếu search không rỗng, chuẩn hóa để tìm kiếm không phân biệt chữ hoa/thường
        String finalSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        
        return productRepository.filterProducts(categoryId, brandId, finalSearch);
    }
}
