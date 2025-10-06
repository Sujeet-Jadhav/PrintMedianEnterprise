package com.backend.printmedianenterprise.Services.Category;

import com.backend.printmedianenterprise.Dto.ProductCategoryDto;
import com.backend.printmedianenterprise.Dto.CategoryStatusUpdateDto;
import com.backend.printmedianenterprise.Entity.ProductCategory;
import com.backend.printmedianenterprise.Exceptions.CategoryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.printmedianenterprise.Repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    @Autowired
	private CategoryRepository categoryRepository;

    @Override
	public ProductCategory createCategory(ProductCategoryDto categoryDto) {
        ProductCategory category = new ProductCategory();
		category.setName(categoryDto.getName());
		category.setDescription(categoryDto.getDescription());

		return categoryRepository.save(category);
	}

    @Override
    public List<ProductCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public ProductCategory updateCategoryById(Long categoryId, ProductCategoryDto categoryDto) {
//        ProductCategory category = categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));
        ProductCategory category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("Category with ID " + categoryId + " not found"));
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        return categoryRepository.save(category);
    }

    @Override
    public ProductCategory updateCategory(ProductCategoryDto categoryDto) {
        ProductCategory category = categoryRepository.findById(categoryDto.getCategoryId()).orElseThrow(() -> new CategoryNotFoundException("Category with ID " + categoryDto.getCategoryId() + " not found"));
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        return categoryRepository.save(category);
    }

    @Override
    public Boolean updateCategoryStatus(CategoryStatusUpdateDto statusUpdateDto) {
        ProductCategory category = categoryRepository.findById(statusUpdateDto.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category with ID " + statusUpdateDto.getCategoryId() + " not found"));
        category.setStatus(statusUpdateDto.getStatus());
        categoryRepository.save(category);
        return true;
    }
}
