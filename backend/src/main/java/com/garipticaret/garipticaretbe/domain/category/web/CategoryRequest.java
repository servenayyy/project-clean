package com.garipticaret.garipticaretbe.domain.category.web;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequest {

    @NotBlank(message = "Kategori adı boş olamaz")
    private String name;

    private String slug;
    private Long parentCategoryId;
    private String imageUrl;
    private String iconUrl;
    private Boolean isFeatured = false;
    private Boolean showOnHomepage = false;
    private Integer menuOrder = 0;
    private Boolean isActive = true;
}