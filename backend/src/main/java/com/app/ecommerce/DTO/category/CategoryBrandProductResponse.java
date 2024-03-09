package com.app.ecommerce.DTO.category;

import java.util.List;

import com.app.ecommerce.DTO.brand.BrandProductResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryBrandProductResponse {
    private int id;
    private String name;
    private List<BrandProductResponse> brands;
}
