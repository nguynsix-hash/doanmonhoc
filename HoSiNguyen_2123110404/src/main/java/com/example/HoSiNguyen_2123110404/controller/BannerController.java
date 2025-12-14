package com.example.HoSiNguyen_2123110404.controller;

import java.io.IOException;
import java.util.List;

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

import com.example.HoSiNguyen_2123110404.entity.Banner;
import com.example.HoSiNguyen_2123110404.service.BannerService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/banners")
@CrossOrigin(origins = "*")
public class BannerController {

    private final BannerService bannerService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public BannerController(BannerService bannerService) {
        this.bannerService = bannerService;
    }

    @GetMapping
    public List<Banner> getAll() {
        return bannerService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Banner> getById(@PathVariable Long id) {
        return bannerService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Banner> create(@RequestPart("banner") String bannerJson,
                                         @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        Banner banner = objectMapper.readValue(bannerJson, Banner.class);
        Banner saved = bannerService.save(banner, file);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Banner> update(@PathVariable Long id,
                                         @RequestPart("banner") String bannerJson,
                                         @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        Banner banner = objectMapper.readValue(bannerJson, Banner.class);
        Banner updated = bannerService.update(id, banner, file);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bannerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
