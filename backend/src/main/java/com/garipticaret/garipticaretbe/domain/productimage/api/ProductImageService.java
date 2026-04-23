package com.garipticaret.garipticaretbe.domain.productimage.api;


import com.garipticaret.garipticaretbe.domain.productimage.web.ProductImageRequest;

import java.util.List;

public interface ProductImageService {

    ProductImageDto addImage(Long productId, ProductImageRequest request);
    List<ProductImageDto> getImagesByProduct(Long productId);
    ProductImageDto updateImage(Long imageId, ProductImageRequest request);
    void deleteImage(Long imageId);
    void setMainImage(Long productId, Long imageId);
    void reorderImages(Long productId, List<Long> orderedImageIds);
}