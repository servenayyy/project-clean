package com.garipticaret.garipticaretbe.domain.homepage.impl;

import com.garipticaret.garipticaretbe.domain.category.api.CategoryDto;
import com.garipticaret.garipticaretbe.domain.category.api.CategoryService;
import com.garipticaret.garipticaretbe.domain.homepage.api.HomepageDto;
import com.garipticaret.garipticaretbe.domain.homepage.api.HomepageService;
import com.garipticaret.garipticaretbe.domain.product.api.ProductCardDto;
import com.garipticaret.garipticaretbe.domain.product.api.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomepageServiceImpl implements HomepageService {

    private final CategoryService categoryService;
    private final ProductService productService;

    private static final int DEFAULT_NEW_ARRIVALS_LIMIT = 8;
    private static final int DEFAULT_DISCOUNTED_LIMIT = 8;
    private static final int DEFAULT_FEATURED_LIMIT = 8;

    @Override
    @Transactional(readOnly = true)
    public HomepageDto getHomepageData() {
        return getHomepageData(
                DEFAULT_NEW_ARRIVALS_LIMIT,
                DEFAULT_DISCOUNTED_LIMIT,
                DEFAULT_FEATURED_LIMIT
        );
    }

    @Override
    @Transactional(readOnly = true)
    public HomepageDto getHomepageData(int newArrivalsLimit,
                                       int discountedLimit,
                                       int featuredLimit) {

        List<CategoryDto> featuredCategories =
                categoryService.getFeaturedCategories();

        List<CategoryDto> homepageCategories =
                categoryService.getHomepageCategories();

        List<ProductCardDto> newArrivals =
                productService.getNewArrivals(newArrivalsLimit);

        List<ProductCardDto> discountedProducts =
                productService.getDiscounted(discountedLimit);

        List<ProductCardDto> featuredProducts =
                productService.getFeatured(featuredLimit);

        return HomepageDto.builder()
                .featuredCategories(featuredCategories)
                .homepageCategories(homepageCategories)
                .newArrivals(newArrivals)
                .discountedProducts(discountedProducts)
                .featuredProducts(featuredProducts)
                .build();
    }
}