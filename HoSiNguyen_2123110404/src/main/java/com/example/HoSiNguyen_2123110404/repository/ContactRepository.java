package com.example.HoSiNguyen_2123110404.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.HoSiNguyen_2123110404.entity.ContactEntity;

public interface ContactRepository extends JpaRepository<ContactEntity, Long> {
    List<ContactEntity> findByStatus(String status);
}
