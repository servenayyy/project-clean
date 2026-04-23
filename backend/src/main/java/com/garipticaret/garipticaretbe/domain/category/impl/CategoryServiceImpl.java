package com.garipticaret.garipticaretbe.domain.category.impl;

import com.garipticaret.garipticaretbe.domain.category.api.CategoryDto;
import com.garipticaret.garipticaretbe.domain.category.api.CategoryMapper;
import com.garipticaret.garipticaretbe.domain.category.api.CategoryMenuDto;
import com.garipticaret.garipticaretbe.domain.category.api.CategoryService;
import com.garipticaret.garipticaretbe.domain.category.web.CategoryRequest;
import com.garipticaret.garipticaretbe.domain.exception.ResourceNotFoundException;
import com.garipticaret.garipticaretbe.shared.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryMenuDto> getMenuTree() {
        List<Category> parents = categoryRepository.findAllParentCategoriesWithChildren();
        return CategoryMapper.toMenuDtoList(parents);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDto> getFeaturedCategories() {
        List<Category> categories = categoryRepository
                .findByIsFeaturedTrueAndIsActiveTrueOrderByMenuOrderAsc();
        return CategoryMapper.toDtoList(categories);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDto> getHomepageCategories() {
        List<Category> categories = categoryRepository
                .findByShowOnHomepageTrueAndIsActiveTrueOrderByMenuOrderAsc();
        return CategoryMapper.toDtoList(categories);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDto findBySlug(String slug) {
        Category category = categoryRepository.findBySlugAndIsActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori", "slug", slug));
        return CategoryMapper.toDto(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDto> getAll() {
        return CategoryMapper.toDtoList(categoryRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDto getById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori", "id", id));
        return CategoryMapper.toDto(category);
    }

    @Override
    @Transactional
    public CategoryDto create(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName().trim());
        category.setSlug(resolveSlug(request.getSlug(), request.getName()));
        category.setImageUrl(request.getImageUrl());
        category.setIconUrl(request.getIconUrl());
        category.setIsFeatured(request.getIsFeatured());
        category.setShowOnHomepage(request.getShowOnHomepage());
        category.setMenuOrder(request.getMenuOrder());
        category.setIsActive(request.getIsActive());

        if (request.getParentCategoryId() != null) {
            Category parent = categoryRepository.findById(request.getParentCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Üst kategori", "id", request.getParentCategoryId()));
            category.setParent(parent);
        }

        return CategoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public CategoryDto update(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori", "id", id));

        category.setName(request.getName().trim());
        category.setSlug(resolveSlug(request.getSlug(), request.getName()));
        category.setImageUrl(request.getImageUrl());
        category.setIconUrl(request.getIconUrl());
        category.setIsFeatured(request.getIsFeatured());
        category.setShowOnHomepage(request.getShowOnHomepage());
        category.setMenuOrder(request.getMenuOrder());
        category.setIsActive(request.getIsActive());

        if (request.getParentCategoryId() != null) {
            Category parent = categoryRepository.findById(request.getParentCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Üst kategori", "id", request.getParentCategoryId()));
            category.setParent(parent);
        } else {
            category.setParent(null);
        }

        return CategoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kategori", "id", id));
        category.setIsActive(false);
        categoryRepository.save(category);
    }

    private String resolveSlug(String slug, String name) {
        if (slug != null && !slug.isBlank()) {
            return SlugUtil.toSlug(slug.trim());
        }
        return SlugUtil.toSlug(name);
    }
}