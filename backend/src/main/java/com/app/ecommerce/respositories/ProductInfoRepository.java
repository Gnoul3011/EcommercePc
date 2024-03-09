package com.app.ecommerce.respositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.app.ecommerce.models.ProductInfo;

public interface ProductInfoRepository extends JpaRepository<ProductInfo, Integer> {
  @Query(value = "SELECT * FROM public.product_info WHERE product_info.product_id = ?1 " +
                  "AND product_info.deleted_at IS NULL ORDER BY id ASC", nativeQuery = true)
  List<ProductInfo> getProductInformation(Integer productId);

  @Query(value = "SELECT * FROM public.product_info WHERE product_info.product_id = ?1 " +
                  "AND product_info.deleted_at IS NULL ORDER BY id ASC", nativeQuery = true)
  List<ProductInfo> getProductInformationAllAttributes(Integer productId);

  @Transactional
  @Modifying
  @Query(value = "DELETE FROM public.product_info WHERE product_info.product_id = ?1", nativeQuery = true)
  void deleteAllByProductId(Integer productId);
}
