package com.example.HoSiNguyen_2123110404.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.HoSiNguyen_2123110404.entity.Brand;
import com.example.HoSiNguyen_2123110404.repository.BrandRepository;
import com.example.HoSiNguyen_2123110404.service.BrandService;

@Service
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<Brand> getAll() {
        return brandRepository.findAll();
    }

    @Override
    public Optional<Brand> getById(Long id) {
        return brandRepository.findById(id);
    }

    @Override
    public Brand save(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public void delete(Long id) {
        brandRepository.deleteById(id);
    }
}
