package com.backend.printmedianenterprise.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Pattern;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCategoryDto {

	private Long id;
	
	@NotBlank(message = "Category name is required")
	@Size(min = 2, max = 100, message = "Category name must be between 2 and 100 characters")
	@Pattern(regexp = "^[a-zA-Z0-9\\s&-_.]+$", message = "Category name contains invalid characters")
	private String name;
	
	@Size(max = 1000, message = "Category description cannot exceed 1000 characters")
	private String description;

    @Min(value = 0, message = "Status must be 0 (inactive) or 1 (active)")
    @Max(value = 1, message = "Status must be 0 (inactive) or 1 (active)")
    @Builder.Default
    private Integer status = 1;

    // Read-only fields for response
    @JsonIgnore
    private String createdAt;

    @JsonIgnore
    private String updatedAt;

    // Helper method for backward compatibility
    public Long getCategoryId() {
        return id;
    }

    public void setCategoryId(Long categoryId) {
        this.id = categoryId;
    }

    // Validation helper methods
    public boolean isValidStatus() {
        return status != null && (status == 0 || status == 1);
    }

    public String getCleanName() {
        return name != null ? name.trim() : null;
    }
}
