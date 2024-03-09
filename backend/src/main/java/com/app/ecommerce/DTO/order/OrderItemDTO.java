package com.app.ecommerce.DTO.order;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
  private String productName;
  private String productLine;
  private String productSN;
  private Date warrantyDate;
  private float price;
  private float discount;
}
