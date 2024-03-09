package com.app.ecommerce.DTO.order;

import java.util.List;

import com.app.ecommerce.models.OrderInformation;
import com.app.ecommerce.models.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetailResponse {
  private List<OrderItemDTO> orderItems;
  private OrderInformation orderInformation;
  private OrderStatus orderStatus;
}
