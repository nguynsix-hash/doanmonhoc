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

import com.example.HoSiNguyen_2123110404.entity.Banner;
import com.example.HoSiNguyen_2123110404.repository.BannerRepository;

@Service
public class BannerService {

    private final BannerRepository bannerRepository;
    private final String UPLOAD_DIR = "uploads/banners/";

    public BannerService(BannerRepository bannerRepository) {
        this.bannerRepository = bannerRepository;
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replace(" ", "_");
        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/banners/" + fileName;
    }

    public List<Banner> getAll() {
        return bannerRepository.findAll();
    }

    public Optional<Banner> getById(Long id) {
        return bannerRepository.findById(id);
    }

    public Banner save(Banner banner, MultipartFile file) throws IOException {
        String imageUrl = saveFile(file);
        if (imageUrl != null) banner.setImageUrl(imageUrl);
        return bannerRepository.save(banner);
    }

    public Banner update(Long id, Banner banner, MultipartFile file) throws IOException {
        Banner exist = bannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Banner không tồn tại với id: " + id));

        exist.setTitle(banner.getTitle());
        exist.setDescription(banner.getDescription());

        String imageUrl = saveFile(file);
        if (imageUrl != null) exist.setImageUrl(imageUrl);

        return bannerRepository.save(exist);
    }

    public void delete(Long id) {
        bannerRepository.deleteById(id);
    }
}
