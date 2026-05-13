package com.backend.printmedianenterprise.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobManagementDto {

    private UUID id;

    private Integer serialNumber;

    private String clientName;

    private String description;

    private String createdBy;

    private Double amount;
}
