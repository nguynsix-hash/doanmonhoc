package com.example.HoSiNguyen_2123110404.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.HoSiNguyen_2123110404.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
    boolean existsByUsername(String username);
}
