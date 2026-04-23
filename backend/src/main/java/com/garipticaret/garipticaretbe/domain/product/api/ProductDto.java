package com.garipticaret.garipticaretbe.domain.product.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Long id;
    private String name;
    private String slug;
    private String shortDescription;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private Integer discountPercent;
    private Integer stockQuantity;
    private String sku;
    private String brand;
    private String material;
    private String color;
    private String volume;
    private Boolean isNew;
    private Boolean isDiscounted;
    private Boolean isFeatured;
    private Boolean isActive;
    private String mainImageUrl;
    private Long categoryId;
    private String categoryName;
    private String categorySlug;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}