package com.example.HoSiNguyen_2123110404.dto;

public class OrderItemRequest {
    private Long productId;
    private Integer quantity;

    // getters & setters
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
