package com.garipticaret.garipticaretbe.domain.product.api;

import com.garipticaret.garipticaretbe.domain.product.web.ProductRequest;
import com.garipticaret.garipticaretbe.shared.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    // Public
    ProductDetailDto findBySlug(String slug);
    List<ProductCardDto> getNewArrivals(int limit);
    List<ProductCardDto> getDiscounted(int limit);
    List<ProductCardDto> getFeatured(int limit);
    PageResponse<ProductCardDto> getByCategory(String categorySlug, Pageable pageable);
    PageResponse<ProductCardDto> search(String query, Pageable pageable);

    // Admin
    PageResponse<ProductCardDto> getAll(Pageable pageable);
    ProductDetailDto getById(Long id);
    ProductDetailDto create(ProductRequest request);
    ProductDetailDto update(Long id, ProductRequest request);
    void delete(Long id);
}