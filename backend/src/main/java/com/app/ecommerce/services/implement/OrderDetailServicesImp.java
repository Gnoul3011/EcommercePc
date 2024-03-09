package com.app.ecommerce.services.implement;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ecommerce.DTO.order.CartItem;
import com.app.ecommerce.models.AccountOrder;
import com.app.ecommerce.models.OrderDetail;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.models.ProductWarranty;
import com.app.ecommerce.respositories.OrderDetailRepository;
import com.app.ecommerce.services.IOrderDetailServices;
import com.app.ecommerce.services.IProductServices;
import com.app.ecommerce.services.IProductWarrantyServices;

@Service
public class OrderDetailServicesImp implements IOrderDetailServices {

  @Autowired
  private OrderDetailRepository OrderDetailRepository;

  @Autowired
  private IProductServices productServices;

  @Autowired
  private IProductWarrantyServices productWarrantyServices;

  @Override
  public List<OrderDetail> createOrderDetail(List<CartItem> cartItems, AccountOrder order) throws NumberFormatException, SQLException {
    List<OrderDetail> orderDetails = new ArrayList<OrderDetail>();
    for (CartItem cartItem : cartItems) {
      Product product = productServices.getProduct(cartItem.getProductLine());
      for (int i = 0; i < cartItem.getQuantity(); i++) {
        ProductWarranty productWarranty = productWarrantyServices.activeWarranty(cartItem.getProductLine());
        OrderDetail newOrderDetail = OrderDetail.builder()
          .purchaseDiscount(product.getDiscount())
          .purchasePrice(product.getPrice())
          .productWarranty(productWarranty)
          .accountOrder(order)
          .build();
        orderDetails.add(newOrderDetail);
      }
    }
    return this.OrderDetailRepository.saveAll(orderDetails);
  }
  
}
