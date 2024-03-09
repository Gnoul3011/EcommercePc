package com.app.ecommerce.DTO.product;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {
  @NotEmpty
  private String productLine;
  @NotEmpty
  private String productName;
  private float price;
  private float discount;
  private int brandId;
  private int categoryId;
  private int warrantyPeriodId;
}
