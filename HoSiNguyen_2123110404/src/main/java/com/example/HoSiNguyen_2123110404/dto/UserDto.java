package com.example.HoSiNguyen_2123110404.dto;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import com.example.HoSiNguyen_2123110404.entity.UserEntity;

public class UserDto {
    private static final String BASE_URL = "http://localhost:8080";

    private Long id;
    private String username;
    private String fullName;
    private String email;
    private String role;
    private String avatar;
    private MultipartFile avatarFile;
    private String password;
    private String phone;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserDto() {}

    public UserDto(UserEntity user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.phone = user.getPhone();
        this.address = user.getAddress();
        this.createdAt = user.getCreatedAt();   // ✅ thêm dòng này
        this.updatedAt = user.getUpdatedAt();   // ✅ thêm dòng này

        if (user.getAvatar() != null && !user.getAvatar().isEmpty()) {
            if (user.getAvatar().startsWith("/uploads")) {
                this.avatar = BASE_URL + user.getAvatar();
            } else {
                this.avatar = BASE_URL + "/uploads/avatars/" + user.getAvatar();
            }
        } else {
            this.avatar = null;
        }
    }

    // ===== Getters & Setters =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public MultipartFile getAvatarFile() { return avatarFile; }
    public void setAvatarFile(MultipartFile avatarFile) { this.avatarFile = avatarFile; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
