package com.garipticaret.garipticaretbe.domain.category.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findBySlugAndIsActiveTrue(String slug);

    List<Category> findByParentIsNullAndIsActiveTrueOrderByMenuOrderAsc();

    List<Category> findByIsFeaturedTrueAndIsActiveTrueOrderByMenuOrderAsc();

    List<Category> findByShowOnHomepageTrueAndIsActiveTrueOrderByMenuOrderAsc();

    boolean existsBySlug(String slug);

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.children ch " +
            "WHERE c.parent IS NULL AND c.isActive = true " +
            "ORDER BY c.menuOrder ASC")
    List<Category> findAllParentCategoriesWithChildren();
}