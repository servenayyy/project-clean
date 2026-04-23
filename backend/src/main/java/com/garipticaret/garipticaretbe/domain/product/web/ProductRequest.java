package com.garipticaret.garipticaretbe.domain.product.web;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductRequest {

    @NotBlank(message = "Ürün adı boş olamaz")
    private String name;

    private String slug;

    private String shortDescription;
    private String description;

    @NotNull(message = "Fiyat boş olamaz")
    @DecimalMin(value = "0.0", inclusive = false, message = "Fiyat 0'dan büyük olmalı")
    private BigDecimal price;

    private BigDecimal discountPrice;
    private Integer stockQuantity = 0;
    private String sku;
    private String brand;
    private String material;
    private String color;
    private String volume;
    private Boolean isNew = false;
    private Boolean isDiscounted = false;
    private Boolean isFeatured = false;
    private Boolean isActive = true;
    private String mainImageUrl;

    @NotNull(message = "Kategori seçilmesi zorunludur")
    private Long categoryId;
}