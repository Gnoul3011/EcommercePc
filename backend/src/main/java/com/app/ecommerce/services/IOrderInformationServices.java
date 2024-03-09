package com.app.ecommerce.services;

import com.app.ecommerce.DTO.OrderInformation.UpdateOrderInformation;
import com.app.ecommerce.models.OrderInformation;

public interface IOrderInformationServices {
  public OrderInformation createOrderInformation(OrderInformation orderInformation);

  public OrderInformation getOrderInformationById(int id);

  public OrderInformation updateOrderInformation(int id, UpdateOrderInformation updateOrderInformation);
}
