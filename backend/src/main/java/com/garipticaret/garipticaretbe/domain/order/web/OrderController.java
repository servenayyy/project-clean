package com.garipticaret.garipticaretbe.domain.order.web;

import com.garipticaret.garipticaretbe.domain.order.api.OrderDto;
import com.garipticaret.garipticaretbe.domain.order.api.OrderService;
import com.garipticaret.garipticaretbe.shared.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto>> create(
            @Valid @RequestBody OrderRequest request) {
        OrderDto created = orderService.create(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Siparişiniz alındı", created));
    }
}