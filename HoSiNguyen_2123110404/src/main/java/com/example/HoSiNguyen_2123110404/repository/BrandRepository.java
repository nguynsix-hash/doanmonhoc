package com.example.HoSiNguyen_2123110404.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.HoSiNguyen_2123110404.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
}
