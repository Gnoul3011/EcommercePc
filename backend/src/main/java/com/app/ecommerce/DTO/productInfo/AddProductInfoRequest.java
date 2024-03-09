package com.app.ecommerce.DTO.productInfo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddProductInfoRequest {
  private String productLine;
  private List<String> infos;
}
