package com.example.HoSiNguyen_2123110404.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.HoSiNguyen_2123110404.dto.OrderItemRequest;
import com.example.HoSiNguyen_2123110404.dto.OrderRequest;
import com.example.HoSiNguyen_2123110404.entity.OrderEntity;
import com.example.HoSiNguyen_2123110404.entity.OrderItemEntity;
import com.example.HoSiNguyen_2123110404.entity.Product;
import com.example.HoSiNguyen_2123110404.entity.UserEntity;
import com.example.HoSiNguyen_2123110404.repository.OrderRepository;
import com.example.HoSiNguyen_2123110404.repository.ProductRepository;
import com.example.HoSiNguyen_2123110404.repository.UserRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<OrderEntity> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Optional<OrderEntity> getOrder(Long id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public OrderEntity createOrder(String username, OrderRequest request) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setStatus("PENDING");
        order.setAddress(request.getAddress());

        // --- snapshot thông tin khách hàng ---
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerPhone(request.getCustomerPhone());
        // --------------------------------------

        List<OrderItemEntity> items = new ArrayList<>();
        double total = 0.0;

        if (request.getItems() != null) {
            for (OrderItemRequest ir : request.getItems()) {
                Product product = productRepository.findById(ir.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found: " + ir.getProductId()));

                OrderItemEntity item = new OrderItemEntity();
                item.setProductId(product.getId());
                item.setProductName(product.getName());
                Double unitPrice = product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getPrice();
                if (unitPrice == null) unitPrice = 0.0;
                item.setPrice(unitPrice);
                item.setQuantity(ir.getQuantity() == null ? 1 : ir.getQuantity());
                item.setOrder(order);
                items.add(item);

                total += unitPrice * item.getQuantity();
            }
        }

        order.setOrderItems(items);
        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    @Transactional
    public OrderEntity updateStatus(Long id, String status) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
