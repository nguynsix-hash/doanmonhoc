package com.example.HoSiNguyen_2123110404.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.HoSiNguyen_2123110404.entity.Menu;
import com.example.HoSiNguyen_2123110404.service.MenuService;

@RestController
@RequestMapping("/api/menus")
@CrossOrigin(origins = "*")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public List<Menu> getAll() {
        return menuService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Menu> getById(@PathVariable Long id) {
        return menuService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Menu> create(@RequestBody Menu menu) {
        Menu saved = menuService.save(menu);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Menu> update(@PathVariable Long id, @RequestBody Menu menu) {
        Menu updated = menuService.update(id, menu);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        menuService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Lấy menu theo position
    @GetMapping("/position/{pos}")
    public List<Menu> getByPosition(@PathVariable String pos) {
        return menuService.getAll().stream()
                .filter(m -> m.getPosition().equalsIgnoreCase(pos))
                .toList();
    }

    // Lấy menu theo status
    @GetMapping("/status/{status}")
    public List<Menu> getByStatus(@PathVariable String status) {
        return menuService.getAll().stream()
                .filter(m -> m.getStatus().equalsIgnoreCase(status))
                .toList();
    }

    // Lấy menu theo position + status
    @GetMapping("/position/{pos}/status/{status}")
    public List<Menu> getByPositionAndStatus(@PathVariable String pos, @PathVariable String status) {
        return menuService.getAll().stream()
                .filter(m -> m.getPosition().equalsIgnoreCase(pos) && m.getStatus().equalsIgnoreCase(status))
                .toList();
    }
}
