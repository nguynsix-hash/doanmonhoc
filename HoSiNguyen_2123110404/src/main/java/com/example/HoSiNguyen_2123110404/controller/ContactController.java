package com.example.HoSiNguyen_2123110404.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.HoSiNguyen_2123110404.dto.ContactDto;
import com.example.HoSiNguyen_2123110404.entity.ContactEntity;
import com.example.HoSiNguyen_2123110404.service.ContactService;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // --- List all contacts ---
    @GetMapping
    public List<ContactDto> getAll() {
        return contactService.getAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    // --- Get contact by id ---
    @GetMapping("/{id}")
    public ResponseEntity<ContactDto> getById(@PathVariable Long id) {
        return contactService.getById(id)
                .map(c -> ResponseEntity.ok(toDto(c)))
                .orElse(ResponseEntity.status(404).build());
    }

    // --- Create contact ---
    @PostMapping
    public ResponseEntity<ContactDto> create(@RequestBody ContactDto dto) {
        ContactEntity contact = new ContactEntity();
        contact.setName(dto.getName());
        contact.setEmail(dto.getEmail());
        contact.setPhone(dto.getPhone());
        contact.setMessage(dto.getMessage());
        contact.setStatus("NEW");
        ContactEntity saved = contactService.create(contact);
        return ResponseEntity.ok(toDto(saved));
    }

    @PutMapping("/{id}")
public ResponseEntity<ContactDto> update(@PathVariable Long id, @RequestBody ContactDto dto) {
    ContactEntity contact = new ContactEntity();
    contact.setName(dto.getName());
    contact.setEmail(dto.getEmail());
    contact.setPhone(dto.getPhone());
    contact.setMessage(dto.getMessage());
    contact.setStatus(dto.getStatus());
    ContactEntity updated = contactService.update(id, contact);
    return ResponseEntity.ok(toDto(updated));
}

    // --- Delete contact ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contactService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // --- Mapper ---
    private ContactDto toDto(ContactEntity c) {
        ContactDto dto = new ContactDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setEmail(c.getEmail());
        dto.setPhone(c.getPhone());
        dto.setMessage(c.getMessage());
        dto.setStatus(c.getStatus());
        dto.setCreatedAt(c.getCreatedAt());
        return dto;
    }
}
