package com.backend.printmedianenterprise.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryStatusUpdateDto {

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotNull(message = "Status is required")
    @Min(value = 0, message = "Status must be 0 (inactive) or 1 (active)")
    @Max(value = 1, message = "Status must be 0 (inactive) or 1 (active)")
    private Integer status;
}
