package com.garipticaret.garipticaretbe.domain.category.api;

import com.garipticaret.garipticaretbe.domain.category.impl.Category;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CategoryMapper {

    private CategoryMapper() {}

    public static CategoryDto toDto(Category category) {
        if (category == null) return null;

        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .imageUrl(category.getImageUrl())
                .iconUrl(category.getIconUrl())
                .isFeatured(category.getIsFeatured())
                .showOnHomepage(category.getShowOnHomepage())
                .menuOrder(category.getMenuOrder())
                .parentId(category.getParent() != null ? category.getParent().getId() : null)
                .parentName(category.getParent() != null ? category.getParent().getName() : null)
                .isActive(category.getIsActive())
                .build();
    }

    public static CategoryMenuDto toMenuDto(Category category) {
        if (category == null) return null;

        List<CategoryMenuDto> children = new ArrayList<>();
        if (category.getChildren() != null) {
            children = category.getChildren().stream()
                    .filter(child -> Boolean.TRUE.equals(child.getIsActive()))
                    .map(CategoryMapper::toMenuDto)
                    .collect(Collectors.toList());
        }

        return CategoryMenuDto.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .imageUrl(category.getImageUrl())
                .iconUrl(category.getIconUrl())
                .menuOrder(category.getMenuOrder())
                .children(children)
                .build();
    }

    public static List<CategoryDto> toDtoList(List<Category> categories) {
        if (categories == null) return new ArrayList<>();
        return categories.stream()
                .map(CategoryMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<CategoryMenuDto> toMenuDtoList(List<Category> categories) {
        if (categories == null) return new ArrayList<>();
        return categories.stream()
                .map(CategoryMapper::toMenuDto)
                .collect(Collectors.toList());
    }
}