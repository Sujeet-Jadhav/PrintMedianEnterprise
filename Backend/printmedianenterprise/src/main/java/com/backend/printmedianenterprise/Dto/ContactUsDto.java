package com.backend.printmedianenterprise.Dto;

import lombok.Data;

@Data
public class ContactUsDto {

    private Long id;
    private String name;
    private String email;
    private String mobile;
    private String message;
    private String status = "Pending";
    private String adminRemark;

}
