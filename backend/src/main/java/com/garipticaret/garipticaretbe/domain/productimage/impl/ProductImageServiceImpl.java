package com.garipticaret.garipticaretbe.domain.productimage.impl;

import com.garipticaret.garipticaretbe.domain.exception.ResourceNotFoundException;
import com.garipticaret.garipticaretbe.domain.product.impl.Product;
import com.garipticaret.garipticaretbe.domain.productimage.impl.ProductImage;
import com.garipticaret.garipticaretbe.domain.product.impl.ProductRepository;
import com.garipticaret.garipticaretbe.domain.productimage.api.ProductImageDto;
import com.garipticaret.garipticaretbe.domain.productimage.api.ProductImageService;
import com.garipticaret.garipticaretbe.domain.productimage.web.ProductImageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public ProductImageDto addImage(Long productId, ProductImageRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Ürün", "id", productId));

        if (Boolean.TRUE.equals(request.getIsMain())) {
            productImageRepository.resetMainImage(productId);
        }

        int order = request.getDisplayOrder() != null
                ? request.getDisplayOrder()
                : productImageRepository.countByProductId(productId);

        ProductImage image = ProductImage.builder()
                .product(product)
                .imageUrl(request.getImageUrl().trim())
                .isMain(request.getIsMain())
                .displayOrder(order)
                .build();

        ProductImage saved = productImageRepository.save(image);

        if (Boolean.TRUE.equals(request.getIsMain())) {
            product.setMainImageUrl(request.getImageUrl().trim());
            productRepository.save(product);
        }

        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductImageDto> getImagesByProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Ürün", "id", productId);
        }
        return productImageRepository
                .findByProductIdOrderByDisplayOrderAsc(productId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProductImageDto updateImage(Long imageId, ProductImageRequest request) {
        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Görsel", "id", imageId));

        if (Boolean.TRUE.equals(request.getIsMain())) {
            productImageRepository.resetMainImage(image.getProduct().getId());
            image.getProduct().setMainImageUrl(request.getImageUrl().trim());
            productRepository.save(image.getProduct());
        }

        image.setImageUrl(request.getImageUrl().trim());
        image.setIsMain(request.getIsMain());
        image.setDisplayOrder(request.getDisplayOrder());

        return toDto(productImageRepository.save(image));
    }

    @Override
    @Transactional
    public void deleteImage(Long imageId) {
        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Görsel", "id", imageId));

        Long productId = image.getProduct().getId();
        boolean wasMain = Boolean.TRUE.equals(image.getIsMain());

        productImageRepository.deleteById(imageId);

        if (wasMain) {
            List<ProductImage> remaining = productImageRepository
                    .findByProductIdOrderByDisplayOrderAsc(productId);
            if (!remaining.isEmpty()) {
                ProductImage newMain = remaining.get(0);
                newMain.setIsMain(true);
                productImageRepository.save(newMain);

                Product product = newMain.getProduct();
                product.setMainImageUrl(newMain.getImageUrl());
                productRepository.save(product);
            }
        }
    }

    @Override
    @Transactional
    public void setMainImage(Long productId, Long imageId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Ürün", "id", productId));

        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Görsel", "id", imageId));

        productImageRepository.resetMainImage(productId);

        image.setIsMain(true);
        productImageRepository.save(image);

        product.setMainImageUrl(image.getImageUrl());
        productRepository.save(product);
    }

    @Override
    @Transactional
    public void reorderImages(Long productId, List<Long> orderedImageIds) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Ürün", "id", productId);
        }

        List<ProductImage> images = new ArrayList<>();
        for (int i = 0; i < orderedImageIds.size(); i++) {
            Long imageId = orderedImageIds.get(i);
            ProductImage image = productImageRepository.findById(imageId)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Görsel", "id", imageId));
            image.setDisplayOrder(i);
            images.add(image);
        }
        productImageRepository.saveAll(images);
    }

    private ProductImageDto toDto(ProductImage image) {
        return ProductImageDto.builder()
                .id(image.getId())
                .productId(image.getProduct().getId())
                .imageUrl(image.getImageUrl())
                .isMain(image.getIsMain())
                .displayOrder(image.getDisplayOrder())
                .build();
    }
}