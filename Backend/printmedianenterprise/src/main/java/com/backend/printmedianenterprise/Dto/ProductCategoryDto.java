package com.backend.printmedianenterprise.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class ProductCategoryDto {

	private Long id;
	
	private String name;
	
	private String description;

    private int status;

    private String createdAt;

    private String updatedAt;

}
