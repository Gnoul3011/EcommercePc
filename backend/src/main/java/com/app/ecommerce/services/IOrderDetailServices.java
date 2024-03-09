package com.app.ecommerce.services;

import java.sql.SQLException;
import java.util.List;

import com.app.ecommerce.DTO.order.CartItem;
import com.app.ecommerce.models.AccountOrder;
import com.app.ecommerce.models.OrderDetail;

public interface IOrderDetailServices {
  public List<OrderDetail> createOrderDetail(List<CartItem> cartItems, AccountOrder order) throws NumberFormatException, SQLException;
}
