package com.example.HoSiNguyen_2123110404.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.HoSiNguyen_2123110404.entity.UserEntity;
import com.example.HoSiNguyen_2123110404.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String UPLOAD_DIR = "uploads/avatars/";

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserEntity> getAll() { return userRepository.findAll(); }

    public Optional<UserEntity> getById(Long id) { return userRepository.findById(id); }

    public UserEntity create(UserEntity user, MultipartFile avatarFile) throws IOException {
        if (avatarFile != null && !avatarFile.isEmpty()) {
            user.setAvatar(saveAvatar(avatarFile));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public UserEntity update(Long id, UserEntity user, MultipartFile avatarFile) throws IOException {
        return userRepository.findById(id).map(u -> {
            u.setUsername(user.getUsername());
            u.setFullName(user.getFullName());
            u.setEmail(user.getEmail());
            u.setPhone(user.getPhone());
            u.setAddress(user.getAddress());
            if (user.getPassword() != null && !user.getPassword().isEmpty())
                u.setPassword(passwordEncoder.encode(user.getPassword()));
            u.setRole(user.getRole());
            try {
                if (avatarFile != null && !avatarFile.isEmpty())
                    u.setAvatar(saveAvatar(avatarFile));
            } catch (IOException e) {
                throw new RuntimeException("Upload avatar lỗi");
            }
            return userRepository.save(u);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void delete(Long id) { userRepository.deleteById(id); }

    public Optional<UserEntity> findByUsername(String username) { return userRepository.findByUsername(username); }

    public String saveAvatar(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if(!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // trả về đường dẫn public
        return "/uploads/avatars/" + fileName;
    }
}
