package com.garipticaret.garipticaretbe.domain.order.web;

import com.garipticaret.garipticaretbe.domain.order.api.OrderDto;
import com.garipticaret.garipticaretbe.domain.order.api.OrderService;
import com.garipticaret.garipticaretbe.domain.order.api.OrderStatus;
import com.garipticaret.garipticaretbe.shared.ApiResponse;
import com.garipticaret.garipticaretbe.shared.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<OrderDto>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) OrderStatus status) {

        PageRequest pageable = PageRequest.of(page, size,
                Sort.by("createdAt").descending());

        PageResponse<OrderDto> result = status != null
                ? orderService.getByStatus(status, pageable)
                : orderService.getAll(pageable);

        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(orderService.getById(id)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderDto>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusUpdateRequest request) {
        return ResponseEntity.ok(
                ApiResponse.ok("Sipariş durumu güncellendi",
                        orderService.updateStatus(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Sipariş silindi", null));
    }
}