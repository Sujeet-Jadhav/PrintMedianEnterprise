package com.backend.printmedianenterprise.Services.ContactUs;

import com.backend.printmedianenterprise.Dto.ContactUsDto;
import com.backend.printmedianenterprise.Entity.ContactUs;

import java.util.List;

public interface ContactUsService {

    ContactUs saveContactUs(ContactUsDto contactUsDto);

    List<ContactUs> getAllContacts();
}
