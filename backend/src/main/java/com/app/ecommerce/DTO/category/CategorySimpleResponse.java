package com.app.ecommerce.DTO.category;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategorySimpleResponse {
  private int id;
  private String name;
  private List<CategoryBrandDTO> brands;
}
