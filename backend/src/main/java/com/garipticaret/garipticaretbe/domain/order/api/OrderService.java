package com.garipticaret.garipticaretbe.domain.order.api;

import com.garipticaret.garipticaretbe.domain.order.web.OrderRequest;
import com.garipticaret.garipticaretbe.domain.order.web.OrderStatusUpdateRequest;
import com.garipticaret.garipticaretbe.shared.PageResponse;
import org.springframework.data.domain.Pageable;

public interface OrderService {

    // Public — müşteri sipariş verir
    OrderDto create(OrderRequest request);

    // Admin
    PageResponse<OrderDto> getAll(Pageable pageable);
    PageResponse<OrderDto> getByStatus(OrderStatus status, Pageable pageable);
    OrderDto getById(Long id);
    OrderDto updateStatus(Long id, OrderStatusUpdateRequest request);
    void delete(Long id);
}