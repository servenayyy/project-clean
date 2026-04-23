package com.garipticaret.garipticaretbe.domain.product.impl;

import com.garipticaret.garipticaretbe.domain.category.impl.Category;
import com.garipticaret.garipticaretbe.domain.category.impl.CategoryRepository;
import com.garipticaret.garipticaretbe.domain.exception.ResourceNotFoundException;
import com.garipticaret.garipticaretbe.domain.product.api.ProductCardDto;
import com.garipticaret.garipticaretbe.domain.product.api.ProductDetailDto;
import com.garipticaret.garipticaretbe.domain.product.api.ProductMapper;
import com.garipticaret.garipticaretbe.domain.product.api.ProductService;
import com.garipticaret.garipticaretbe.domain.product.web.ProductRequest;
import com.garipticaret.garipticaretbe.shared.PageResponse;
import com.garipticaret.garipticaretbe.shared.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public ProductDetailDto findBySlug(String slug) {
        Product product = productRepository.findBySlugAndIsActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün", "slug", slug));
        return ProductMapper.toDetailDto(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductCardDto> getNewArrivals(int limit) {
        List<Product> products = productRepository
                .findByIsNewTrueAndIsActiveTrueOrderByCreatedAtDesc(
                        PageRequest.of(0, limit));
        return ProductMapper.toCardDtoList(products);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductCardDto> getDiscounted(int limit) {
        List<Product> products = productRepository
                .findByIsDiscountedTrueAndIsActiveTrueOrderByDiscountPriceAsc(
                        PageRequest.of(0, limit));
        return ProductMapper.toCardDtoList(products);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductCardDto> getFeatured(int limit) {
        List<Product> products = productRepository
                .findByIsFeaturedTrueAndIsActiveTrueOrderByCreatedAtDesc(
                        PageRequest.of(0, limit));
        return ProductMapper.toCardDtoList(products);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProductCardDto> getByCategory(
            String categorySlug, Pageable pageable) {
        Page<Product> page = productRepository
                .findByCategorySlug(categorySlug, pageable);
        return PageResponse.of(page.map(ProductMapper::toCardDto));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProductCardDto> search(String query, Pageable pageable) {
        Page<Product> page = productRepository.searchByName(query, pageable);
        return PageResponse.of(page.map(ProductMapper::toCardDto));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProductCardDto> getAll(Pageable pageable) {
        Page<Product> page = productRepository.findByIsActiveTrue(pageable);
        return PageResponse.of(page.map(ProductMapper::toCardDto));
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDetailDto getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün", "id", id));
        return ProductMapper.toDetailDto(product);
    }

    @Override
    @Transactional
    public ProductDetailDto create(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Kategori", "id", request.getCategoryId()));

        Product product = new Product();
        mapRequestToProduct(request, product, category);

        return ProductMapper.toDetailDto(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductDetailDto update(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün", "id", id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Kategori", "id", request.getCategoryId()));

        mapRequestToProduct(request, product, category);

        return ProductMapper.toDetailDto(productRepository.save(product));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün", "id", id));
        product.setIsActive(false);
        productRepository.save(product);
    }

    private void mapRequestToProduct(
            ProductRequest request, Product product, Category category) {
        product.setName(request.getName().trim());
        product.setSlug(resolveSlug(request.getSlug(), request.getName()));
        product.setShortDescription(request.getShortDescription());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setSku(request.getSku());
        product.setBrand(request.getBrand());
        product.setMaterial(request.getMaterial());
        product.setColor(request.getColor());
        product.setVolume(request.getVolume());
        product.setIsNew(request.getIsNew());
        product.setIsDiscounted(request.getIsDiscounted());
        product.setIsFeatured(request.getIsFeatured());
        product.setIsActive(request.getIsActive());
        product.setMainImageUrl(request.getMainImageUrl());
        product.setCategory(category);
    }

    private String resolveSlug(String slug, String name) {
        if (slug != null && !slug.isBlank()) {
            return SlugUtil.toSlug(slug.trim());
        }
        return SlugUtil.toSlug(name);
    }
}