package com.app.ecommerce.DTO.productInfo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductInfoRequest {
  private List<ProductInfoDTO> productInfos;
  private String productLine;
}
