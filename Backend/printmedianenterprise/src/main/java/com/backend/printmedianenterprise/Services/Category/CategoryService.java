package com.backend.printmedianenterprise.Services.Category;

import com.backend.printmedianenterprise.Dto.ProductCategoryDto;
import com.backend.printmedianenterprise.Dto.CategoryStatusUpdateDto;
import com.backend.printmedianenterprise.Entity.ProductCategory;

import java.util.List;

public interface CategoryService {


	ProductCategory createCategory(ProductCategoryDto categoryDto);

    List<ProductCategory> getAllCategories();

    // Method for updating by path variable
    ProductCategory updateCategoryById(Long categoryId, ProductCategoryDto categoryDto);

    // Method for updating by request body ID
    ProductCategory updateCategory(ProductCategoryDto categoryDto);

    // Updated method to use the new DTO
    Boolean updateCategoryStatus(CategoryStatusUpdateDto statusUpdateDto);
}
