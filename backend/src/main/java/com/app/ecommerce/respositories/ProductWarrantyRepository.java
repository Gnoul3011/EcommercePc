package com.app.ecommerce.respositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ecommerce.models.ProductWarranty;


public interface ProductWarrantyRepository extends JpaRepository<ProductWarranty, Integer> {
  
  @Query(value = "SELECT * FROM public.product_warranty WHERE product_warranty.product_id = ?1 " +
                  "AND product_warranty.deleted_at IS NULL AND product_warranty.purchased_at IS NULL ORDER BY id ASC", nativeQuery = true)
  Optional<List<ProductWarranty>> findAllByProductId(Integer productId);

  @Query(value = "SELECT * FROM public.product_warranty WHERE product_warranty.product_id = ?1 " +
                  "ORDER BY id ASC", nativeQuery = true)
  Optional<List<ProductWarranty>> getAllByProductId(Integer productId);

  @Query(value = "SELECT product_warranty.* " + //
                  "FROM public.product, public.product_warranty, public.warranty_period " + //
                  "WHERE product.id = product_warranty.product_id " + //
                  "AND product.warranty_period_id = warranty_period.id " + //
                  "AND product_warranty.purchased_at IS NULL " + //
                  "AND product.product_line = ?1 " + //
                  "LIMIT 1", nativeQuery = true)
  ProductWarranty selectFirstProductWarranty(String productLine);

  @Query(value = "UPDATE public.product_warranty " + //
                "SET purchased_at = ?1, warranty_period = ?2 " + //
                "WHERE id = ?3 ", nativeQuery = true)
  void activeWarrantyProduct(Date currentTimestamp, Date validUntil, Integer productWarrantyId);
}