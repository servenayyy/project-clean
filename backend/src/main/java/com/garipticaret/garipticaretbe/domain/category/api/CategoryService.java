package com.garipticaret.garipticaretbe.domain.category.api;

import com.garipticaret.garipticaretbe.domain.category.web.CategoryRequest;

import java.util.List;

public interface CategoryService {

    // Public
    List<CategoryMenuDto> getMenuTree();
    List<CategoryDto> getFeaturedCategories();
    List<CategoryDto> getHomepageCategories();
    CategoryDto findBySlug(String slug);

    // Admin
    List<CategoryDto> getAll();
    CategoryDto getById(Long id);
    CategoryDto create(CategoryRequest request);
    CategoryDto update(Long id, CategoryRequest request);
    void delete(Long id);
}