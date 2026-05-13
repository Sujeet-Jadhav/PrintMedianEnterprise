package com.backend.printmedianenterprise.Controller;

import com.backend.printmedianenterprise.Dto.ContactUsDto;
import com.backend.printmedianenterprise.Entity.ContactUs;
import com.backend.printmedianenterprise.Services.ContactUs.ContactUsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contactus")
@RequiredArgsConstructor
public class ContactUsController {

    private final ContactUsService contactUsService;

    @PostMapping("/submit_contact")
    public ResponseEntity<ContactUs> submitContact(@Valid @RequestBody ContactUsDto contactUsDto) {
        ContactUs savedContact = contactUsService.saveContactUs(contactUsDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
    }

    @GetMapping("/all_contacts")
    public ResponseEntity<List<ContactUs>> getAllContacts() {
        List<ContactUs> contacts = contactUsService.getAllContacts();
        return ResponseEntity.status(HttpStatus.OK).body(contacts);
    }

}
