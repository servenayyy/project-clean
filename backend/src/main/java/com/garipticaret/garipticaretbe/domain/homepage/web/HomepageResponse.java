package com.garipticaret.garipticaretbe.domain.homepage.web;

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
public class HomepageResponse {

    private List<CategoryDto> featuredCategories;
    private List<CategoryDto> homepageCategories;
    private List<ProductCardDto> newArrivals;
    private List<ProductCardDto> discountedProducts;
    private List<ProductCardDto> featuredProducts;
    private int newArrivalsCount;
    private int discountedCount;
    private int featuredCount;

    public static HomepageResponse from(
            List<CategoryDto> featuredCategories,
            List<CategoryDto> homepageCategories,
            List<ProductCardDto> newArrivals,
            List<ProductCardDto> discountedProducts,
            List<ProductCardDto> featuredProducts) {

        return HomepageResponse.builder()
                .featuredCategories(featuredCategories)
                .homepageCategories(homepageCategories)
                .newArrivals(newArrivals)
                .discountedProducts(discountedProducts)
                .featuredProducts(featuredProducts)
                .newArrivalsCount(newArrivals != null ? newArrivals.size() : 0)
                .discountedCount(discountedProducts != null ? discountedProducts.size() : 0)
                .featuredCount(featuredProducts != null ? featuredProducts.size() : 0)
                .build();
    }
}