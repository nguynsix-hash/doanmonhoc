package com.example.HoSiNguyen_2123110404.mapper;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.HoSiNguyen_2123110404.dto.OrderItemResponse;
import com.example.HoSiNguyen_2123110404.dto.OrderResponse;
import com.example.HoSiNguyen_2123110404.entity.OrderEntity;
import com.example.HoSiNguyen_2123110404.entity.OrderItemEntity;

@Component
public class OrderMapper {

    public OrderResponse toResponse(OrderEntity entity) {
        if (entity == null) return null;
        
        OrderResponse response = new OrderResponse();
        
        // 1. Map các trường cơ bản từ OrderEntity sang OrderResponse
        response.setId(entity.getId());
        response.setTotalAmount(entity.getTotalAmount());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt());
        response.setAddress(entity.getAddress());
        response.setCustomerName(entity.getCustomerName());
        response.setCustomerEmail(entity.getCustomerEmail());
        response.setCustomerPhone(entity.getCustomerPhone());
        
        // Map thông tin User (giả định UserEntity có getId() và getName() hoặc FullName)
        if (entity.getUser() != null) {
            response.setUserId(entity.getUser().getId());
            // response.setUserFullName(entity.getUser().getFullName()); // Thay thế bằng trường phù hợp
        }

        // 2. FIX LỖI: Sử dụng setItems và chuyển đổi Stream sang List
        response.setItems(entity.getOrderItems().stream()
                .map(this::toItemResponse)
                .collect(Collectors.toList()) // Thu thập Stream thành List
        );
        
        return response;
    }

    public OrderItemResponse toItemResponse(OrderItemEntity entity) {
        if (entity == null) return null;
        
        OrderItemResponse itemResponse = new OrderItemResponse();
        itemResponse.setProductId(entity.getProductId());
        itemResponse.setProductName(entity.getProductName());
        itemResponse.setPrice(entity.getPrice());
        itemResponse.setQuantity(entity.getQuantity());
        
        return itemResponse;
    }
}