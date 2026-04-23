package com.garipticaret.garipticaretbe.domain.productimage.web;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductImageRequest {

    @NotBlank(message = "Görsel URL boş olamaz")
    private String imageUrl;

    private Boolean isMain = false;
    private Integer displayOrder = 0;
}