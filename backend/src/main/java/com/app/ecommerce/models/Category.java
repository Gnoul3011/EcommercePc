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
@EqualsAndHashCode(callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category extends BaseEntity {
    @Column(name = "name", length = 20, nullable = false)
    private String name;

    // Mapping
    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<Product> products;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<Brand> brands;
}