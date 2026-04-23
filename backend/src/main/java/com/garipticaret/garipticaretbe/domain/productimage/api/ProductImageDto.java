package com.garipticaret.garipticaretbe.domain.productimage.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductImageDto {

    private Long id;
    private Long productId;
    private String imageUrl;
    private Boolean isMain;
    private Integer displayOrder;
}