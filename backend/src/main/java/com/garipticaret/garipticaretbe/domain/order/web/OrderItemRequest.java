package com.garipticaret.garipticaretbe.domain.order.web;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter @Setter
public class OrderItemRequest {

    private Long productId;

    @NotBlank
    private String productName;

    private String productImageUrl;

    @NotNull @DecimalMin("0.01")
    private BigDecimal unitPrice;

    @NotNull @Min(1)
    private Integer quantity;
}