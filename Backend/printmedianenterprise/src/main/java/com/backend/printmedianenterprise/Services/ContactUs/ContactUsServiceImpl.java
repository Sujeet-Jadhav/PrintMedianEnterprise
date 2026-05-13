package com.backend.printmedianenterprise.Services.ContactUs;

import com.backend.printmedianenterprise.Dto.ContactUsDto;
import com.backend.printmedianenterprise.Entity.ContactUs;
import com.backend.printmedianenterprise.Repository.ContactUsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactUsServiceImpl implements ContactUsService{

    @Autowired
    private final ContactUsRepository contactUsRepository;

    @Override
    public ContactUs saveContactUs(ContactUsDto contactUsDto) {
        ContactUs contactUs = new ContactUs();
        contactUs.setName(contactUsDto.getName());
        contactUs.setEmail(contactUsDto.getEmail());
        contactUs.setMobile(contactUsDto.getMobile());
        contactUs.setMessage(contactUsDto.getMessage());
        return contactUsRepository.save(contactUs);
    }

    @Override
    public List<ContactUs> getAllContacts() {
        return contactUsRepository.findAll();
    }
}
