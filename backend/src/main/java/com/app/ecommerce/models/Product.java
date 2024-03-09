package com.app.ecommerce.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product extends BaseEntity {

    @Column(name = "product_line", length = 50, nullable = false, unique = true)
    private String productLine;

    @Column(name = "product_name", length = 150, nullable = false)
    private String productName;

    @Column(name = "price", length = 10)
    private float price;

    @Column(name = "discount", length = 3, columnDefinition = "float default 0")
    private float discount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    @JsonBackReference
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonBackReference
    private Category category;

    @OneToMany()
    @JsonBackReference
    private List<ProductInfo> productInfos;

    @OneToMany()
    @JsonBackReference
    private List<ProductWarranty> productWarranties;

    @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "warranty_period_id", referencedColumnName = "id")
    @JsonBackReference
    private WarrantyPeriod warrantyPeriod;
}