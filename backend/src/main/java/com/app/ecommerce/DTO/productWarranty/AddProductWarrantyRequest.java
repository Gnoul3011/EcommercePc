package com.app.ecommerce.DTO.productWarranty;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddProductWarrantyRequest {
  private String productLine;
  private List<String> productWarranties;
}
