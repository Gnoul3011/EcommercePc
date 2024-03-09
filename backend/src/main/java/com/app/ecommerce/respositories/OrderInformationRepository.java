package com.app.ecommerce.respositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ecommerce.models.OrderInformation;

public interface OrderInformationRepository extends JpaRepository<OrderInformation, Integer> {
  
  @Query(value = "SELECT * FROM public.order_information WHERE account_order_id = ?1", nativeQuery = true)
  public Optional<OrderInformation> findByOrderId(Integer orderId);
}
