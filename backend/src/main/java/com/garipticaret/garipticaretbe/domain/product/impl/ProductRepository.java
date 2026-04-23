package com.garipticaret.garipticaretbe.domain.product.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySlugAndIsActiveTrue(String slug);

    List<Product> findByIsNewTrueAndIsActiveTrueOrderByCreatedAtDesc(
            org.springframework.data.domain.Pageable pageable);

    List<Product> findByIsDiscountedTrueAndIsActiveTrueOrderByDiscountPriceAsc(
            org.springframework.data.domain.Pageable pageable);

    List<Product> findByIsFeaturedTrueAndIsActiveTrueOrderByCreatedAtDesc(
            org.springframework.data.domain.Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "WHERE p.category.slug = :slug AND p.isActive = true")
    Page<Product> findByCategorySlug(
            @Param("slug") String slug, Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "WHERE p.isActive = true AND " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Product> searchByName(
            @Param("query") String query, Pageable pageable);

    Page<Product> findByIsActiveTrue(Pageable pageable);

    boolean existsBySlug(String slug);
}