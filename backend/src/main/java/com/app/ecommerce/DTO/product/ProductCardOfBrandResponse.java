package com.app.ecommerce.DTO.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductCardOfBrandResponse {
    private int id;
    private String brandName;
    private String name;
    private String productLine;
    private String productName;
    private float price;
    private float discount;
    private String thumbnailUri;
    private int stock;
}
