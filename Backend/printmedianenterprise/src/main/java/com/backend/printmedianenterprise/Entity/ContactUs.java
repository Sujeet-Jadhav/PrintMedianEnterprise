package com.backend.printmedianenterprise.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name="contact_us")
@Entity
public class ContactUs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String mobile;

    @Lob
    private String message;

    private String status = "Pending";

    @Lob
    private String adminRemark;

}
