package com.example.HoSiNguyen_2123110404.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Double discountPrice;
    private Integer quantity;
    private String status;
    private String image;
private LocalDateTime createdAt; 
    private Integer categoryId;
    private String categoryName;

    private Long brandId;
    private String brandName;
}
