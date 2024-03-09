package com.app.ecommerce.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ecommerce.DTO.product.TopSellingProduct;
import com.app.ecommerce.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
  Optional<Product> findByProductLine(String productLine);

  @Query(value = "SELECT product.id as id,product.product_name as productName, product.product_line as productLine, product.price as price ,product.created_at as createdAt, COUNT(product_warranty.product_id) as totalSold "
      + //
      "FROM product_warranty " + //
      "LEFT JOIN product ON product.id = product_warranty.product_id " + //
      "WHERE product_warranty.purchased_at IS NOT NULL " + //
      "GROUP BY  product.id, product.product_name, product.price ,product.created_at " + //
      "ORDER BY totalSold DESC, product.price DESC " + //
      "LIMIT 10", nativeQuery = true)
  List<TopSellingProduct> getTopSellingProduct();

  @Query(value = "SELECT product.* " + //
      "FROM product " + //
      "LEFT JOIN product_info ON product_info.product_id = product.id " + //
      "LEFT JOIN brand ON product.brand_id = brand.id  " + //
      "LEFT JOIN category ON product.category_id = category.id " + //
      "WHERE UPPER(product.product_line) LIKE UPPER(?1) OR " + //
      "UPPER(product.product_name) LIKE UPPER(?1) OR " + //
      "UPPER(product_info.product_information) LIKE UPPER(?1) OR " + //
      "UPPER(category.name) LIKE UPPER(?1) OR " + //
      "UPPER(brand.brand_name) LIKE UPPER(?1) " + //
      "GROUP BY product.id;", nativeQuery = true)
  List<Product> searchProducts(String searchString);
}