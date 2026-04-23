package com.garipticaret.garipticaretbe.domain.order.web;

import com.garipticaret.garipticaretbe.domain.order.api.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderStatusUpdateRequest {

    @NotNull(message = "Durum boş olamaz")
    private OrderStatus status;
}