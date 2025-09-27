package com.backend.printmedianenterprise.Services.Category;

import org.springframework.stereotype.Service;

import com.backend.printmedianenterprise.Dto.CategoryDto;
import com.backend.printmedianenterprise.Entity.Category;
import com.backend.printmedianenterprise.Repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

	private final CategoryRepository categoryRepository;

	public Category createCategory(CategoryDto categoryDto) {
		Category category = new Category();
		category.setName(categoryDto.getName());
		category.setDescription(categoryDto.getDescription());
		
		return categoryRepository.save(category);
	}
}
