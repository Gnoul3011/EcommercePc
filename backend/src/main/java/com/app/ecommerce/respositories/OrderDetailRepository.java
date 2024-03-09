package com.app.ecommerce.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ecommerce.models.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{
  
  @Query(value = "SELECT * FROM public.order_detail WHERE account_order_id = ?1", nativeQuery = true)
  public Optional<List<OrderDetail>> findAllByOrderId(Integer orderId);
}
