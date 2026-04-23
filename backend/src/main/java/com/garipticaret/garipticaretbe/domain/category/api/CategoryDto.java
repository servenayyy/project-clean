package com.garipticaret.garipticaretbe.domain.category.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {

    private Long id;
    private String name;
    private String slug;
    private String imageUrl;
    private String iconUrl;
    private Boolean isFeatured;
    private Boolean showOnHomepage;
    private Integer menuOrder;
    private Long parentId;
    private String parentName;
    private Boolean isActive;
}