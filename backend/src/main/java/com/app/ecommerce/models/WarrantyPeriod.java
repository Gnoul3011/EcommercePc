package com.app.ecommerce.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
@Data
@EqualsAndHashCode(callSuper=false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "warranty_period")
public class WarrantyPeriod extends BaseEntity {
    @Column(name = "months", length = 11, nullable = false)
    private int months;

    @OneToMany(mappedBy = "warrantyPeriod", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Product> products;
}