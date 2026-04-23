package com.garipticaret.garipticaretbe.domain.product.impl;

import com.garipticaret.garipticaretbe.common.base.BaseEntity;
import com.garipticaret.garipticaretbe.domain.category.impl.Category;
import com.garipticaret.garipticaretbe.domain.productimage.impl.ProductImage;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 300)
    private String name;

    @Column(nullable = false, unique = true, length = 300)
    private String slug;

    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "discount_price", precision = 12, scale = 2)
    private BigDecimal discountPrice;

    @Column(name = "stock_quantity")
    private Integer stockQuantity = 0;

    @Column(length = 100)
    private String sku;

    @Column(length = 150)
    private String brand;

    @Column(length = 150)
    private String material;

    @Column(length = 100)
    private String color;

    @Column(length = 100)
    private String volume;

    @Column(name = "is_new")
    private Boolean isNew = false;

    @Column(name = "is_discounted")
    private Boolean isDiscounted = false;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "main_image_url", length = 500)
    private String mainImageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<ProductImage> images = new ArrayList<>();
}