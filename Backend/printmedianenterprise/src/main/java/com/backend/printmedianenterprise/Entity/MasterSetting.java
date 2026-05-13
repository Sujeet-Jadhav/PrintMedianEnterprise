package com.backend.printmedianenterprise.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name="master_setting")
@Data
public class MasterSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;

    @Lob
    private String about;

    private String email;

    private String phone;

    private String address;

    private String facebook;

    private String twitter;

    private String instagram;

    private String whatsapp;

    @Lob
    @Column(columnDefinition = "Longblob")
    private byte[] logo;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
