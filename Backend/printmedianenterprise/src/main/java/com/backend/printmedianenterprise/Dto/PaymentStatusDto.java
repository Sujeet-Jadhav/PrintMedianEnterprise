package com.backend.printmedianenterprise.Dto;

import com.backend.printmedianenterprise.Enum.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentStatusDto {

    private UUID id;

    private PaymentStatus paymentStatus;
}
