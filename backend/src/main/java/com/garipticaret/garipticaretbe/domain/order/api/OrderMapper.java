package com.garipticaret.garipticaretbe.domain.order.api;

import com.garipticaret.garipticaretbe.domain.order.impl.Order;
import com.garipticaret.garipticaretbe.domain.order.impl.OrderItem;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    private OrderMapper() {}

    public static OrderDto toDto(Order order) {
        if (order == null) return null;

        List<OrderItemDto> items = new ArrayList<>();
        if (order.getItems() != null) {
            items = order.getItems().stream()
                    .map(OrderMapper::toItemDto)
                    .collect(Collectors.toList());
        }

        return OrderDto.builder()
                .id(order.getId())
                .customerName(order.getCustomerName())
                .customerEmail(order.getCustomerEmail())
                .customerPhone(order.getCustomerPhone())
                .shippingAddress(order.getShippingAddress())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .notes(order.getNotes())
                .items(items)
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

    public static OrderItemDto toItemDto(OrderItem item) {
        if (item == null) return null;

        BigDecimal lineTotal = item.getUnitPrice()
                .multiply(BigDecimal.valueOf(item.getQuantity()));

        return OrderItemDto.builder()
                .id(item.getId())
                .productId(item.getProductId())
                .productName(item.getProductName())
                .productImageUrl(item.getProductImageUrl())
                .unitPrice(item.getUnitPrice())
                .quantity(item.getQuantity())
                .lineTotal(lineTotal)
                .build();
    }

    public static List<OrderDto> toDtoList(List<Order> orders) {
        if (orders == null) return new ArrayList<>();
        return orders.stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }
}