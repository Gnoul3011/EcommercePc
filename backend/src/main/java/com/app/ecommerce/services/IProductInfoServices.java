package com.app.ecommerce.services;

import java.util.List;

import com.app.ecommerce.DTO.productInfo.ProductInfoDTO;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.models.ProductInfo;

public interface IProductInfoServices {
  public Product addProductInfos(String productLine, List<String> productInfos);
  public List<ProductInfoDTO> getProductInfos(Integer productId);  
  public List<ProductInfo> getProductInfosAllAttributes(Integer productId);
  public List<ProductInfo> deleteProductInfos(List<Integer> infoIds);
  public List<ProductInfoDTO> updateProductInfo(List<ProductInfoDTO> productInfos, String productLine);
}
