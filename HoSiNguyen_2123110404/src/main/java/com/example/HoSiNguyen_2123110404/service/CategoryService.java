package com.example.HoSiNguyen_2123110404.service;

import java.util.List;
import java.util.Optional;

import com.example.HoSiNguyen_2123110404.entity.Category;

public interface CategoryService {
    List<Category> getAll();
    Optional<Category> getById(Integer id);
    Category save(Category category);
    void delete(Integer id);
}
