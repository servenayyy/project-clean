package com.garipticaret.garipticaretbe.domain.product.web;

import com.garipticaret.garipticaretbe.domain.product.api.ProductCardDto;
import com.garipticaret.garipticaretbe.domain.product.api.ProductDetailDto;
import com.garipticaret.garipticaretbe.domain.product.api.ProductService;
import com.garipticaret.garipticaretbe.shared.ApiResponse;
import com.garipticaret.garipticaretbe.shared.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/new-arrivals")
    public ResponseEntity<ApiResponse<List<ProductCardDto>>> getNewArrivals(
            @RequestParam(defaultValue = "8") int limit) {
        return ResponseEntity.ok(ApiResponse.ok(productService.getNewArrivals(limit)));
    }

    @GetMapping("/discounted")
    public ResponseEntity<ApiResponse<List<ProductCardDto>>> getDiscounted(
            @RequestParam(defaultValue = "8") int limit) {
        return ResponseEntity.ok(ApiResponse.ok(productService.getDiscounted(limit)));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProductCardDto>>> getFeatured(
            @RequestParam(defaultValue = "8") int limit) {
        return ResponseEntity.ok(ApiResponse.ok(productService.getFeatured(limit)));
    }

    @GetMapping("/by-category/{categorySlug}")
    public ResponseEntity<ApiResponse<PageResponse<ProductCardDto>>> getByCategory(
            @PathVariable String categorySlug,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(
                ApiResponse.ok(productService.getByCategory(categorySlug, pageable)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageResponse<ProductCardDto>>> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        Pageable pageable = PageRequest.of(page, size,
                Sort.by("createdAt").descending());
        return ResponseEntity.ok(
                ApiResponse.ok(productService.search(query, pageable)));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<ProductDetailDto>> getBySlug(
            @PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(productService.findBySlug(slug)));
    }
}