package com.app.ecommerce.models;

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
@Table(name = "order_detail")
public class OrderDetail extends BaseEntity {
    @Column(name = "purchase_price", length = 11, nullable = false)
    private float purchasePrice;

    @Column(name = "purchase_discount", length = 11, nullable = false, columnDefinition = "float default 0")
    private float purchaseDiscount;

    // ---------- Mapping -----------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_warranty_id", referencedColumnName = "id")
    private ProductWarranty productWarranty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_order_id", referencedColumnName = "id")
    @JsonBackReference
    private AccountOrder accountOrder;

}