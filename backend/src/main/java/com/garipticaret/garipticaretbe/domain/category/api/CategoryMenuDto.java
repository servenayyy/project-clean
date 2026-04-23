package com.garipticaret.garipticaretbe.domain.category.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryMenuDto {

    private Long id;
    private String name;
    private String slug;
    private String imageUrl;
    private String iconUrl;
    private Integer menuOrder;

    @Builder.Default
    private List<CategoryMenuDto> children = new ArrayList<>();
}