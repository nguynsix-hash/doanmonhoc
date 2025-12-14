package com.example.HoSiNguyen_2123110404.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.HoSiNguyen_2123110404.dto.ProductDto;
import com.example.HoSiNguyen_2123110404.entity.Product;
import com.example.HoSiNguyen_2123110404.mapper.ProductMapper;
import com.example.HoSiNguyen_2123110404.service.BrandService;
import com.example.HoSiNguyen_2123110404.service.CategoryService;
import com.example.HoSiNguyen_2123110404.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final BrandService brandService;
    private final ProductMapper productMapper;
    private final String UPLOAD_DIR = "uploads/products/";

    public ProductController(ProductService productService, CategoryService categoryService,
                             BrandService brandService, ProductMapper productMapper) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.brandService = brandService;
        this.productMapper = productMapper;
    }

    // --- CRUD hiện tại giữ nguyên ---
    @GetMapping
    public List<ProductDto> getAllProducts() {
        return productService.getAll()
                .stream()
                .map(productMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        return productService.getById(id)
                .map(product -> ResponseEntity.ok(productMapper.toDto(product)))
                .orElse(ResponseEntity.status(404).build());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDto> createProduct(
            @RequestParam String name,
            @RequestParam Double price,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer quantity,
            @RequestParam(required = false) Double discountPrice,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Long brandId,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setDescription(description);
        product.setQuantity(quantity);
        product.setDiscountPrice(discountPrice);
        product.setStatus(status);

        if (categoryId != null) categoryService.getById(categoryId).ifPresent(product::setCategory);
        if (brandId != null) brandService.getById(brandId).ifPresent(product::setBrand);

        if (image != null && !image.isEmpty()) {
            product.setImage(saveFile(image));
        }

        Product saved = productService.save(product);
        return ResponseEntity.ok(productMapper.toDto(saved));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDto> updateProduct(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam Double price,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer quantity,
            @RequestParam(required = false) Double discountPrice,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Long brandId,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        return productService.getById(id).map(product -> {
            product.setName(name);
            product.setPrice(price);
            product.setDescription(description);
            product.setQuantity(quantity);
            product.setDiscountPrice(discountPrice);
            product.setStatus(status);

            if (categoryId != null) categoryService.getById(categoryId).ifPresent(product::setCategory);
            if (brandId != null) brandService.getById(brandId).ifPresent(product::setBrand);

            if (image != null && !image.isEmpty()) {
                try {
                    product.setImage(saveFile(image));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            Product updated = productService.save(product);
            return ResponseEntity.ok(productMapper.toDto(updated));
        }).orElse(ResponseEntity.status(404).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        return productService.getById(id).map(product -> {
            productService.delete(id);
            return ResponseEntity.ok("✅ Xóa sản phẩm thành công!");
        }).orElse(ResponseEntity.status(404).body("❌ Sản phẩm không tồn tại"));
    }

    // --- Endpoint mới: lọc theo category và brand ---
   @GetMapping("/filter")
public List<ProductDto> filterProducts(
        @RequestParam(required = false) Integer categoryId,
        @RequestParam(required = false) Long brandId,
        @RequestParam(required = false) String search
) {
    // ⭐ THAY THẾ KHỐI IF-ELSE BẰNG MỘT LỜI GỌI DUY NHẤT ĐẾN SERVICE
    // ProductService.filter() sẽ xử lý logic kết hợp cả 3 điều kiện (category, brand, search) 
    // và gọi đến truy vấn JPQL trong Repository.
    List<Product> products = productService.filter(categoryId, brandId, search);

    return products.stream().map(productMapper::toDto).collect(Collectors.toList());
}

    // --- Hàm upload file ---
    private String saveFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/products/" + fileName;
    }
    
}
