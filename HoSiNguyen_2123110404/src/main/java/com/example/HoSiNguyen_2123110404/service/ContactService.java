package com.example.HoSiNguyen_2123110404.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.HoSiNguyen_2123110404.entity.ContactEntity;
import com.example.HoSiNguyen_2123110404.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository repository;

    // Inject repository qua constructor
    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    // Lấy tất cả contact
    public List<ContactEntity> getAll() {
        return repository.findAll();
    }

    // Lấy contact theo id
    public Optional<ContactEntity> getById(Long id) {
        return repository.findById(id);
    }

    // Tạo contact mới
    public ContactEntity create(ContactEntity contact) {
        return repository.save(contact);
    }

    // Cập nhật status contact
    public ContactEntity updateStatus(Long id, String status) {
        ContactEntity existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact không tồn tại"));
        existing.setStatus(status);
        return repository.save(existing);
    }

    // Cập nhật toàn bộ contact
    public ContactEntity update(Long id, ContactEntity newData) {
        ContactEntity existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact không tồn tại"));
        existing.setName(newData.getName());
        existing.setEmail(newData.getEmail());
        existing.setPhone(newData.getPhone());
        existing.setMessage(newData.getMessage());
        existing.setStatus(newData.getStatus());
        return repository.save(existing);
    }

    // Xóa contact
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
