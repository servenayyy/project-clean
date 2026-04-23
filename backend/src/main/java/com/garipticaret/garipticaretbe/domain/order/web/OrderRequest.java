package com.garipticaret.garipticaretbe.domain.order.web;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class OrderRequest {

    @NotBlank(message = "Müşteri adı boş olamaz")
    private String customerName;

    @NotBlank @Email(message = "Geçerli bir email girin")
    private String customerEmail;

    private String customerPhone;

    @NotBlank(message = "Teslimat adresi boş olamaz")
    private String shippingAddress;

    private String notes;

    @NotEmpty(message = "Sepet boş olamaz")
    private List<OrderItemRequest> items;
}