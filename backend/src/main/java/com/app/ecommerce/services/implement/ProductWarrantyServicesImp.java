package com.app.ecommerce.services.implement;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.models.ProductWarranty;
import com.app.ecommerce.respositories.ProductRepository;
import com.app.ecommerce.respositories.ProductWarrantyRepository;
import com.app.ecommerce.services.IProductWarrantyServices;

@Service
public class ProductWarrantyServicesImp implements IProductWarrantyServices {
  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private ProductWarrantyRepository productWarrantyRepository;

  @Override
  public List<ProductWarranty> addProductWarranties(String productLine, List<String> productWarranties) {
    Optional<Product> product = this.productRepository.findByProductLine(productLine);
    if (!product.isPresent())
      throw new ResourceNotFoundException(productLine + "not found");
    Product fetchedProduct = product.get();
    for (String productWarranty : productWarranties) {
      ProductWarranty newProductWarranty = ProductWarranty.builder().product(fetchedProduct)
          .productWarrantyId(productWarranty).build();
      this.productWarrantyRepository.save(newProductWarranty);
    }
    return this.getAllProductWarrantiesByProductId(fetchedProduct.getId());
  }

  @Override
  public List<ProductWarranty> getAllProductWarrantiesByProductId(Integer productId) {
    return this.productWarrantyRepository.findAllByProductId(productId).get();
  }

  @Override
  public ProductWarranty activeWarranty(String productLine) throws NumberFormatException, SQLException {
    ProductWarranty productWarranty = this.productWarrantyRepository.selectFirstProductWarranty(productLine);
    Product product = this.productRepository.findByProductLine(productLine).get();
    Timestamp timestamp = new Timestamp(new Date().getTime());
    Date newDate = DateUtils.addMonths(timestamp, product.getWarrantyPeriod().getMonths());
    productWarranty.setPurchasedAt(timestamp);
    productWarranty.setWarrantyPeriod(newDate);
    return this.productWarrantyRepository.save(productWarranty);
  }

  @Override
  public Integer getProductStock(int productId) {
    return this.productWarrantyRepository.findAllByProductId(productId).get().size();
  }

  @Override
  public ProductWarranty deactiveWarranty(int productWarrantyId) {
    ProductWarranty productWarranty = this.productWarrantyRepository.findById(productWarrantyId).get();
    productWarranty.setPurchasedAt(null);    
    productWarranty.setWarrantyPeriod(null);
    return this.productWarrantyRepository.save(productWarranty);
  }

  @Override
  public List<ProductWarranty> getWarrantyPeriodsByProductId(int id) {
    return this.productWarrantyRepository.getAllByProductId(id).get();
  }
}
