package com.app.ecommerce.DTO.product;

import java.util.List;

import com.app.ecommerce.DTO.productInfo.ProductInfoDTO;
import com.app.ecommerce.models.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetProductReponse {
  private Product product;
  private int brandId;
  private int categoryId;
  private String brandName;
  private String categoryName;
  private int warrantyPeriodId;
  private String thumbnailUri;
  private List<String> imageUris;
  private List<ProductInfoDTO> productInfos;
  private int warrantyPeriod;
  private int stock;
}
