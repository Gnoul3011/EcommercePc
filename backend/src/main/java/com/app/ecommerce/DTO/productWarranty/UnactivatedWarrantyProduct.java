package com.app.ecommerce.DTO.productWarranty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UnactivatedWarrantyProduct {
  private Integer id;
  private String productLine;
  private Integer months;
}
