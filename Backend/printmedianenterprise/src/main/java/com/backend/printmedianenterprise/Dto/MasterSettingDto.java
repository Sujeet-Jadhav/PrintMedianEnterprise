package com.backend.printmedianenterprise.Dto;

import lombok.Data;

@Data
public class MasterSettingDto {

    private Long id;
    private String projectName;
    private String about;
    private String email;
    private String phone;
    private String address;
    private String facebook;
    private String twitter;
    private String instagram;
    private String whatsapp;
    private String logoBase64; // Base64 encoded image string

}
