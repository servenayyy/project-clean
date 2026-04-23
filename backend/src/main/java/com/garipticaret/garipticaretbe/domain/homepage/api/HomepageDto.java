package com.garipticaret.garipticaretbe.domain.homepage.api;

import com.garipticaret.garipticaretbe.domain.category.api.CategoryDto;
import com.garipticaret.garipticaretbe.domain.product.api.ProductCardDto;
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
public class HomepageDto {

    private List<CategoryDto> featuredCategories;
    private List<CategoryDto> homepageCategories;
    private List<ProductCardDto> newArrivals;
    private List<ProductCardDto> discountedProducts;
    private List<ProductCardDto> featuredProducts;
}