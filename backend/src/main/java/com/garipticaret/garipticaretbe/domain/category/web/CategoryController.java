package com.garipticaret.garipticaretbe.domain.category.web;

import com.garipticaret.garipticaretbe.domain.category.api.CategoryDto;
import com.garipticaret.garipticaretbe.domain.category.api.CategoryMenuDto;
import com.garipticaret.garipticaretbe.domain.category.api.CategoryService;
import com.garipticaret.garipticaretbe.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/menu")
    public ResponseEntity<ApiResponse<List<CategoryMenuDto>>> getMenuTree() {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.getMenuTree()));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getFeatured() {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.getFeaturedCategories()));
    }

    @GetMapping("/homepage")
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getHomepage() {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.getHomepageCategories()));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<CategoryDto>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.findBySlug(slug)));
    }
}