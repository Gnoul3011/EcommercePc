package com.app.ecommerce.DTO.product;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductCardResponse {
    private int id;
    private String productLine;
    private String productName;
    private float price;
    private float discount;
    private String thumbnailUri;
    private int stock;
    private String categoryName;
    private String brandName;
    private Date deletedAt;
    private Date createdAt;
}
