package com.example.HoSiNguyen_2123110404.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.HoSiNguyen_2123110404.entity.PostEntity;
import com.example.HoSiNguyen_2123110404.service.PostService;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostEntity> getAll() {
        return postService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostEntity> getById(@PathVariable Long id) {
        Optional<PostEntity> post = postService.getById(id);
        return post.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PostEntity> create(
        @RequestPart("post") PostEntity post,
        @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {
        PostEntity saved = postService.create(post, file);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostEntity> update(
        @PathVariable Long id,
        @RequestPart("post") PostEntity post,
        @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {
        PostEntity updated = postService.update(id, post, file);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws IOException {
        postService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
