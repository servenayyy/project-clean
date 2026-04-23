package com.garipticaret.garipticaretbe.domain.category.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    private Long id;
    private String name;
    private String slug;
    private String imageUrl;
    private String iconUrl;
    private Boolean isFeatured;
    private Boolean showOnHomepage;
    private Integer menuOrder;
    private Long parentId;
    private Boolean isActive;
    private List<CategoryResponse> children;
}