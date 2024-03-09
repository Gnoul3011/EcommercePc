package com.app.ecommerce.services;

import java.sql.SQLException;
import java.util.List;

import com.app.ecommerce.models.ProductWarranty;

public interface IProductWarrantyServices {
  public List<ProductWarranty> addProductWarranties(String productLine, List<String> productWarranties);

  public List<ProductWarranty> getAllProductWarrantiesByProductId(Integer productId);

  public ProductWarranty activeWarranty(String productLine) throws NumberFormatException, SQLException;

  public Integer getProductStock(int productId);

  public ProductWarranty deactiveWarranty(int productWarrantyId);

  public List<ProductWarranty> getWarrantyPeriodsByProductId(int id);

}
