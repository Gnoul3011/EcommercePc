package com.app.ecommerce.DTO.brand;

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
public class BrandProductResponse {
    private int id;
    private String brandName;
    private List<ProductCardOfBrandResponse> products;
}
