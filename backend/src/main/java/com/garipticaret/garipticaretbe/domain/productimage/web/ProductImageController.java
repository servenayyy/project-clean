package com.garipticaret.garipticaretbe.domain.productimage.web;

import com.garipticaret.garipticaretbe.domain.productimage.api.ProductImageDto;
import com.garipticaret.garipticaretbe.domain.productimage.api.ProductImageService;
import com.garipticaret.garipticaretbe.shared.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products/{productId}/images")
@RequiredArgsConstructor
public class ProductImageController {

    private final ProductImageService productImageService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductImageDto>>> getImages(
            @PathVariable Long productId) {
        return ResponseEntity.ok(
                ApiResponse.ok(productImageService.getImagesByProduct(productId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductImageDto>> addImage(
            @PathVariable Long productId,
            @Valid @RequestBody ProductImageRequest request) {
        ProductImageDto created = productImageService.addImage(productId, request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Görsel eklendi", created));
    }

    @PutMapping("/{imageId}")
    public ResponseEntity<ApiResponse<ProductImageDto>> updateImage(
            @PathVariable Long productId,
            @PathVariable Long imageId,
            @Valid @RequestBody ProductImageRequest request) {
        return ResponseEntity.ok(
                ApiResponse.ok("Görsel güncellendi",
                        productImageService.updateImage(imageId, request)));
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity<ApiResponse<Void>> deleteImage(
            @PathVariable Long productId,
            @PathVariable Long imageId) {
        productImageService.deleteImage(imageId);
        return ResponseEntity.ok(ApiResponse.ok("Görsel silindi", null));
    }

    @PatchMapping("/{imageId}/set-main")
    public ResponseEntity<ApiResponse<Void>> setMainImage(
            @PathVariable Long productId,
            @PathVariable Long imageId) {
        productImageService.setMainImage(productId, imageId);
        return ResponseEntity.ok(ApiResponse.ok("Ana görsel güncellendi", null));
    }

    @PatchMapping("/reorder")
    public ResponseEntity<ApiResponse<Void>> reorderImages(
            @PathVariable Long productId,
            @RequestBody List<Long> orderedImageIds) {
        productImageService.reorderImages(productId, orderedImageIds);
        return ResponseEntity.ok(ApiResponse.ok("Sıralama güncellendi", null));
    }
}