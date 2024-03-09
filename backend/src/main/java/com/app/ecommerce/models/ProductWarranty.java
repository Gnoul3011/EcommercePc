package com.app.ecommerce.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
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
@Table(name = "product_warranty")
public class ProductWarranty extends BaseEntity {
    @Column(name = "product_warranty_id", length = 50, nullable = false, unique = true)
    private String productWarrantyId;

    @Column(name = "purchased_at", nullable = true)
    private Date purchasedAt;

    @Column(name = "warranty_period", nullable = true)
    private Date warrantyPeriod;

    // Mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @JsonBackReference
    private Product product;

}