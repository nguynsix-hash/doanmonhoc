package com.example.HoSiNguyen_2123110404.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.HoSiNguyen_2123110404.dto.OrderItemResponse;
import com.example.HoSiNguyen_2123110404.dto.OrderRequest;
import com.example.HoSiNguyen_2123110404.dto.OrderResponse;
import com.example.HoSiNguyen_2123110404.entity.OrderEntity;
import com.example.HoSiNguyen_2123110404.entity.OrderItemEntity;
import com.example.HoSiNguyen_2123110404.entity.UserEntity;
import com.example.HoSiNguyen_2123110404.service.OrderService;
import com.example.HoSiNguyen_2123110404.service.UserService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    // Create order (USER)
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@AuthenticationPrincipal UserDetails userDetails,
                                                     @RequestBody OrderRequest request) {
        String username = userDetails.getUsername();
        OrderEntity created = orderService.createOrder(username, request);
        return ResponseEntity.ok(toResponse(created));
    }

    // Get orders: ADMIN sees all, USER sees own
    @GetMapping
    public ResponseEntity<List<OrderResponse>> listOrders(@AuthenticationPrincipal UserDetails userDetails) {
        UserEntity u = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<OrderEntity> list = "ADMIN".equals(u.getRole())
                ? orderService.getAllOrders()
                : orderService.getOrdersByUser(u.getId());
        List<OrderResponse> resp = list.stream().map(this::toResponse).collect(Collectors.toList());
        return ResponseEntity.ok(resp);
    }

    // Get order detail
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@AuthenticationPrincipal UserDetails userDetails,
                                                  @PathVariable Long id) {
        UserEntity u = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        OrderEntity order = orderService.getOrder(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!"ADMIN".equals(u.getRole()) && !order.getUser().getId().equals(u.getId())) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(toResponse(order));
    }

    // Update status (ADMIN)
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateStatus(@PathVariable Long id,
                                                      @RequestParam String status) {
        OrderEntity updated = orderService.updateStatus(id, status);
        return ResponseEntity.ok(toResponse(updated));
    }

    // Delete order (ADMIN)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    // Convert OrderEntity → OrderResponse
    private OrderResponse toResponse(OrderEntity order) {
        OrderResponse r = new OrderResponse();
        r.setId(order.getId());
        r.setTotalAmount(order.getTotalAmount());
        r.setStatus(order.getStatus());
        r.setCreatedAt(order.getCreatedAt());

        if (order.getUser() != null) {
            r.setUserId(order.getUser().getId());
            r.setUserFullName(order.getUser().getFullName());
        }

        r.setAddress(order.getAddress());

        // --- customer snapshot ---
        r.setCustomerName(order.getCustomerName());
        r.setCustomerEmail(order.getCustomerEmail());
        r.setCustomerPhone(order.getCustomerPhone());

        List<OrderItemResponse> items = order.getOrderItems().stream()
                .map(this::toItemResponse)
                .collect(Collectors.toList());
        r.setItems(items);

        return r;
    }

    private OrderItemResponse toItemResponse(OrderItemEntity it) {
        OrderItemResponse ir = new OrderItemResponse();
        ir.setId(it.getId());
        ir.setProductId(it.getProductId());
        ir.setProductName(it.getProductName());
        ir.setPrice(it.getPrice());
        ir.setQuantity(it.getQuantity());
        return ir;
    }
}
