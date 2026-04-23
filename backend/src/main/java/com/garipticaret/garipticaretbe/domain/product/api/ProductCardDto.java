package com.garipticaret.garipticaretbe.domain.product.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCardDto {

    private Long id;
    private String name;
    private String slug;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String mainImageUrl;
    private Boolean isNew;
    private Boolean isDiscounted;
    private Integer discountPercent;
    private String categorySlug;
    private String categoryName;
}