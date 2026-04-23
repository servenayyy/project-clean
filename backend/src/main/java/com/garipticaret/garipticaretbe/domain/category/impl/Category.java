package com.garipticaret.garipticaretbe.domain.category.impl;

import com.garipticaret.garipticaretbe.common.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_category_id")
    private Category parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    @OrderBy("menuOrder ASC")
    private List<Category> children = new ArrayList<>();

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "icon_url", length = 500)
    private String iconUrl;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "show_on_homepage")
    private Boolean showOnHomepage = false;

    @Column(name = "menu_order")
    private Integer menuOrder = 0;
}