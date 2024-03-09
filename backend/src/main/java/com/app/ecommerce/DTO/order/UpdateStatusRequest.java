package com.app.ecommerce.DTO.order;

import com.app.ecommerce.models.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateStatusRequest {
  private Integer orderId;
  private OrderStatus orderStatus;
}
