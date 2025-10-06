package com.backend.printmedianenterprise.Controller;

import com.backend.printmedianenterprise.Dto.ProductCategoryDto;
import com.backend.printmedianenterprise.Dto.CategoryStatusUpdateDto;
import com.backend.printmedianenterprise.Entity.ProductCategory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.printmedianenterprise.Services.Category.CategoryService;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryService categoryService;

	@PostMapping("/create_category")
	public ResponseEntity<ProductCategory> createCategory(@Valid @RequestBody ProductCategoryDto categoryDto){
		ProductCategory category = categoryService.createCategory(categoryDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(category);
	}

    @GetMapping("/all_categories")
    public ResponseEntity<List<ProductCategory>> getAllCategories(){
        List<ProductCategory> categories = categoryService.getAllCategories();
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @PutMapping("/update_category/{categoryId}")
    public ResponseEntity<ProductCategory> updateCategory(@PathVariable Long categoryId, @Valid @RequestBody ProductCategoryDto categoryDto) {
        ProductCategory updatedCategory = categoryService.updateCategoryById(categoryId, categoryDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedCategory);
    }

    @PutMapping("/update_category")
    public ResponseEntity<ProductCategory> updateCategory(@Valid @RequestBody ProductCategoryDto categoryDto) {
        ProductCategory updatedCategory = categoryService.updateCategory(categoryDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedCategory);
    }

    @PutMapping("/update_category_status")
    public ResponseEntity<String> updateCategoryStatus(@Valid @RequestBody CategoryStatusUpdateDto statusUpdateDto) {
        Boolean result = categoryService.updateCategoryStatus(statusUpdateDto);
        if(result) {
            return ResponseEntity.status(HttpStatus.OK).body("Category status updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update category status");
        }
    }
}
