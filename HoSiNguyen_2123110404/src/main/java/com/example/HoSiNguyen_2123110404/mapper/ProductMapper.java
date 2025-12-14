package com.example.HoSiNguyen_2123110404.mapper;

import org.springframework.stereotype.Component;
import com.example.HoSiNguyen_2123110404.dto.ProductDto;
import com.example.HoSiNguyen_2123110404.entity.Product;

@Component
public class ProductMapper {

    public ProductDto toDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setDiscountPrice(product.getDiscountPrice());
        dto.setQuantity(product.getQuantity());
        dto.setStatus(product.getStatus());
        dto.setImage(product.getImage());

        // map createdAt
        if (product.getCreatedAt() != null) {
            dto.setCreatedAt(product.getCreatedAt());
        }

        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }

        if (product.getBrand() != null) {
            dto.setBrandId(product.getBrand().getId());
            dto.setBrandName(product.getBrand().getName());
        }

        return dto;
    }
}
