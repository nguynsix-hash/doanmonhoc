package com.example.HoSiNguyen_2123110404.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.HoSiNguyen_2123110404.dto.AuthResponse;
import com.example.HoSiNguyen_2123110404.dto.LoginRequest;
import com.example.HoSiNguyen_2123110404.dto.UserDto;
import com.example.HoSiNguyen_2123110404.entity.UserEntity;
import com.example.HoSiNguyen_2123110404.repository.UserRepository;
import com.example.HoSiNguyen_2123110404.security.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private static final String UPLOAD_DIR = "uploads/";

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // ===== REGISTER =====
    @PostMapping("/register")
    public ResponseEntity<?> register(@ModelAttribute UserDto dto) throws IOException {
        if (userRepository.existsByUsername(dto.getUsername())) {
            return ResponseEntity.badRequest().body("Username đã tồn tại");
        }

        UserEntity user = new UserEntity();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setRole(dto.getRole() != null ? dto.getRole() : "USER");

        // Upload avatar
        MultipartFile avatarFile = dto.getAvatarFile();
        if (avatarFile != null && !avatarFile.isEmpty()) {
            user.setAvatar(saveAvatar(avatarFile));
        }

        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return ResponseEntity.ok(new AuthResponse(token, new UserDto(user)));
    }

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        UserEntity user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Username không tồn tại"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Sai mật khẩu");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return ResponseEntity.ok(new AuthResponse(token, new UserDto(user)));
    }

    // ===== GET ALL USERS =====
    @GetMapping
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    // ===== GET USER BY ID =====
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(new UserDto(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    // ===== UPDATE USER =====
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @ModelAttribute UserDto dto) throws IOException {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setRole(dto.getRole());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        MultipartFile avatarFile = dto.getAvatarFile();
        if (avatarFile != null && !avatarFile.isEmpty()) {
            user.setAvatar(saveAvatar(avatarFile));
        }

        userRepository.save(user);
        return ResponseEntity.ok(new UserDto(user));
    }

    // ===== DELETE USER =====
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("Xoá user thành công");
    }

    // ===== PRIVATE HELPER =====
    private String saveAvatar(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR, "avatars");
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/avatars/" + fileName;
    }
}
