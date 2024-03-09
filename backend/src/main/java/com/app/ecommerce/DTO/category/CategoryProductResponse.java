package com.app.ecommerce.DTO.category;

import java.util.List;

import com.app.ecommerce.DTO.product.ProductCardOfBrandResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryProductResponse {
    private int id;
    private String name;
    private List<ProductCardOfBrandResponse> products;
}
