package com.app.ecommerce.DTO.product;

import java.util.Date;


public interface TopSellingProduct {
  Integer getId();
  String getProductLine();
  String getProductName();
  float getPrice();
  Date getCreatedAt();
  Integer getTotalSold();
}
