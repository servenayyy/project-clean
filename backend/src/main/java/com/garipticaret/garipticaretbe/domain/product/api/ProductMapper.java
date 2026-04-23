package com.garipticaret.garipticaretbe.domain.product.api;

import com.garipticaret.garipticaretbe.domain.product.impl.Product;
import com.garipticaret.garipticaretbe.domain.productimage.impl.ProductImage;
import com.garipticaret.garipticaretbe.domain.productimage.api.ProductImageDto;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {

    private ProductMapper() {}

    public static ProductCardDto toCardDto(Product product) {
        if (product == null) return null;

        return ProductCardDto.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .mainImageUrl(product.getMainImageUrl())
                .isNew(product.getIsNew())
                .isDiscounted(product.getIsDiscounted())
                .discountPercent(calculateDiscountPercent(
                        product.getPrice(), product.getDiscountPrice()))
                .categorySlug(product.getCategory() != null
                        ? product.getCategory().getSlug() : null)
                .categoryName(product.getCategory() != null
                        ? product.getCategory().getName() : null)
                .build();
    }

    public static ProductDetailDto toDetailDto(Product product) {
        if (product == null) return null;

        List<ProductImageDto> images = new ArrayList<>();
        if (product.getImages() != null) {
            images = product.getImages().stream()
                    .map(ProductMapper::toImageDto)
                    .collect(Collectors.toList());
        }

        return ProductDetailDto.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .shortDescription(product.getShortDescription())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .discountPercent(calculateDiscountPercent(
                        product.getPrice(), product.getDiscountPrice()))
                .stockQuantity(product.getStockQuantity())
                .sku(product.getSku())
                .brand(product.getBrand())
                .material(product.getMaterial())
                .color(product.getColor())
                .volume(product.getVolume())
                .isNew(product.getIsNew())
                .isDiscounted(product.getIsDiscounted())
                .isFeatured(product.getIsFeatured())
                .isActive(product.getIsActive())
                .mainImageUrl(product.getMainImageUrl())
                .images(images)
                .categoryId(product.getCategory() != null
                        ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null
                        ? product.getCategory().getName() : null)
                .categorySlug(product.getCategory() != null
                        ? product.getCategory().getSlug() : null)
                .build();
    }

    public static ProductImageDto toImageDto(ProductImage image) {
        if (image == null) return null;
        return ProductImageDto.builder()
                .id(image.getId())
                .imageUrl(image.getImageUrl())
                .isMain(image.getIsMain())
                .displayOrder(image.getDisplayOrder())
                .build();
    }

    public static List<ProductCardDto> toCardDtoList(List<Product> products) {
        if (products == null) return new ArrayList<>();
        return products.stream()
                .map(ProductMapper::toCardDto)
                .collect(Collectors.toList());
    }

    private static Integer calculateDiscountPercent(
            BigDecimal price, BigDecimal discountPrice) {
        if (price == null || discountPrice == null
                || price.compareTo(BigDecimal.ZERO) == 0) {
            return 0;
        }
        BigDecimal diff = price.subtract(discountPrice);
        BigDecimal percent = diff.divide(price, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));
        return percent.setScale(0, RoundingMode.HALF_UP).intValue();
    }
}