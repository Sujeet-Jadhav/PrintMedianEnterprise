package com.backend.printmedianenterprise.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.printmedianenterprise.Dto.CategoryDto;
import com.backend.printmedianenterprise.Entity.Category;
import com.backend.printmedianenterprise.Services.Category.CategoryService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryService categoryService;

	@CrossOrigin
	@PostMapping("/category")
	public ResponseEntity<Category> createCategory(@RequestBody CategoryDto categoryDto){
		Category category = categoryService.createCategory(categoryDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(category);
	}
}
