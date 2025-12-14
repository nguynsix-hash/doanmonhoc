package com.example.HoSiNguyen_2123110404.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.HoSiNguyen_2123110404.entity.Menu;
import com.example.HoSiNguyen_2123110404.repository.MenuRepository;

@Service
public class MenuService {

    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public List<Menu> getAll() {
        return menuRepository.findAll();
    }

    public Optional<Menu> getById(Long id) {
        return menuRepository.findById(id);
    }

    public Menu save(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu update(Long id, Menu menu) {
        Menu exist = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu không tồn tại với id: " + id));

        exist.setName(menu.getName());
        exist.setLink(menu.getLink());
        exist.setIcon(menu.getIcon());
        exist.setOrderIndex(menu.getOrderIndex());
        exist.setPosition(menu.getPosition());
        exist.setStatus(menu.getStatus());

        return menuRepository.save(exist);
    }

    public void delete(Long id) {
        menuRepository.deleteById(id);
    }
}
