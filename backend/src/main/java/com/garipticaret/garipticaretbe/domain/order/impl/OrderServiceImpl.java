package com.garipticaret.garipticaretbe.domain.order.impl;

import com.garipticaret.garipticaretbe.domain.exception.ResourceNotFoundException;
import com.garipticaret.garipticaretbe.domain.order.api.*;
import com.garipticaret.garipticaretbe.domain.order.web.OrderRequest;
import com.garipticaret.garipticaretbe.domain.order.web.OrderStatusUpdateRequest;
import com.garipticaret.garipticaretbe.shared.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public OrderDto create(OrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName().trim());
        order.setCustomerEmail(request.getCustomerEmail().trim());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setShippingAddress(request.getShippingAddress().trim());
        order.setNotes(request.getNotes());
        order.setStatus(OrderStatus.PENDING);

        List<OrderItem> items = request.getItems().stream().map(itemReq -> {
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .productId(itemReq.getProductId())
                    .productName(itemReq.getProductName())
                    .productImageUrl(itemReq.getProductImageUrl())
                    .unitPrice(itemReq.getUnitPrice())
                    .quantity(itemReq.getQuantity())
                    .build();
            return item;
        }).collect(Collectors.toList());

        order.setItems(items);

        BigDecimal total = items.stream()
                .map(i -> i.getUnitPrice()
                        .multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(total);

        return OrderMapper.toDto(orderRepository.save(order));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<OrderDto> getAll(Pageable pageable) {
        return PageResponse.of(
                orderRepository.findAll(pageable).map(OrderMapper::toDto));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<OrderDto> getByStatus(OrderStatus status, Pageable pageable) {
        return PageResponse.of(
                orderRepository.findByStatus(status, pageable)
                        .map(OrderMapper::toDto));
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDto getById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sipariş", "id", id));
        return OrderMapper.toDto(order);
    }

    @Override
    @Transactional
    public OrderDto updateStatus(Long id, OrderStatusUpdateRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sipariş", "id", id));
        order.setStatus(request.getStatus());
        return OrderMapper.toDto(orderRepository.save(order));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sipariş", "id", id));
        orderRepository.delete(order);
    }
}