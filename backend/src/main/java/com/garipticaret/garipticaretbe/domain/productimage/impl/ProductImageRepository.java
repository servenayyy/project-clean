package com.garipticaret.garipticaretbe.domain.productimage.impl;

import com.garipticaret.garipticaretbe.domain.productimage.impl.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    List<ProductImage> findByProductIdOrderByDisplayOrderAsc(Long productId);

    Optional<ProductImage> findByProductIdAndIsMainTrue(Long productId);

    @Modifying
    @Query("UPDATE ProductImage pi SET pi.isMain = false " +
            "WHERE pi.product.id = :productId")
    void resetMainImage(@Param("productId") Long productId);

    @Query("SELECT COUNT(pi) FROM ProductImage pi " +
            "WHERE pi.product.id = :productId")
    int countByProductId(@Param("productId") Long productId);

    void deleteByProductId(Long productId);
}