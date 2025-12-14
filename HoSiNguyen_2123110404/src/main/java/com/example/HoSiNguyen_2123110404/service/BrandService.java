package com.example.HoSiNguyen_2123110404.service;

import java.util.List;
import java.util.Optional;

import com.example.HoSiNguyen_2123110404.entity.Brand;

public interface BrandService {
    List<Brand> getAll();
    Optional<Brand> getById(Long id);
    Brand save(Brand brand);
    void delete(Long id);
}
