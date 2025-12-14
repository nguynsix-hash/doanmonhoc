package com.example.HoSiNguyen_2123110404.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.HoSiNguyen_2123110404.entity.PostEntity;
import com.example.HoSiNguyen_2123110404.repository.PostRepository;

@Service
public class PostService {

    private final PostRepository repository;
    private final String UPLOAD_DIR = "uploads/posts/";

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replace(" ", "_");
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/posts/" + fileName;
    }

    public List<PostEntity> getAll() {
        return repository.findAll();
    }

    public Optional<PostEntity> getById(Long id) {
        return repository.findById(id);
    }

    public PostEntity create(PostEntity post, MultipartFile file) throws IOException {
        String imageUrl = saveFile(file);
        post.setImage(imageUrl);
        return repository.save(post);
    }

    public PostEntity update(Long id, PostEntity newData, MultipartFile file) throws IOException {
        PostEntity existing = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Post không tồn tại"));

        existing.setTitle(newData.getTitle());
        existing.setContent(newData.getContent());

        if (file != null && !file.isEmpty()) {
            // xóa file cũ nếu có
            if (existing.getImage() != null) {
                Path oldPath = Paths.get("uploads" + existing.getImage().replace("/uploads", ""));
                Files.deleteIfExists(oldPath);
            }
            String imageUrl = saveFile(file);
            existing.setImage(imageUrl);
        }

        return repository.save(existing);
    }

    public void delete(Long id) throws IOException {
        PostEntity existing = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Post không tồn tại"));

        if (existing.getImage() != null) {
            Path oldPath = Paths.get("uploads" + existing.getImage().replace("/uploads", ""));
            Files.deleteIfExists(oldPath);
        }

        repository.deleteById(id);
    }
}
