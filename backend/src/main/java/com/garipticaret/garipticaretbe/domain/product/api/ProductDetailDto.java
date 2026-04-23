package com.garipticaret.garipticaretbe.domain.product.api;

import com.garipticaret.garipticaretbe.domain.productimage.api.ProductImageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailDto {

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
    private List<ProductImageDto> images;
    private Long categoryId;
    private String categoryName;
    private String categorySlug;
}