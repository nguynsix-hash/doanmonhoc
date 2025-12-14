package com.example.HoSiNguyen_2123110404.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.HoSiNguyen_2123110404.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByPosition(String position);         // Lấy menu theo vị trí
    List<Menu> findByStatus(String status);             // Lấy menu theo trạng thái
    List<Menu> findByPositionAndStatus(String pos, String status); // Lấy theo cả 2
}
