package com.app.ecommerce.services.implement;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.ForbiddenException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ecommerce.DTO.order.CreateOrderRequest;
import com.app.ecommerce.DTO.order.MonthlyRevenue;
import com.app.ecommerce.DTO.order.OrderDetailResponse;
import com.app.ecommerce.DTO.order.OrderItemDTO;
import com.app.ecommerce.DTO.order.TrustedBuyer;
import com.app.ecommerce.DTO.order.UpdateStatusRequest;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.AccountOrder;
import com.app.ecommerce.models.Brand;
import com.app.ecommerce.models.OrderDetail;
import com.app.ecommerce.models.OrderInformation;
import com.app.ecommerce.models.OrderStatus;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.models.ProductWarranty;
import com.app.ecommerce.respositories.AccountOrderRepository;
import com.app.ecommerce.respositories.AccountRepository;
import com.app.ecommerce.respositories.OrderDetailRepository;
import com.app.ecommerce.respositories.OrderInformationRepository;
import com.app.ecommerce.services.IAccountOrderServices;
import com.app.ecommerce.services.IAccountServices;
import com.app.ecommerce.services.IEmailServices;
import com.app.ecommerce.services.IOrderDetailServices;
import com.app.ecommerce.services.IOrderInformationServices;
import com.app.ecommerce.services.IProductWarrantyServices;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

@Service
public class AccountOrderServicesImp implements IAccountOrderServices {

  @Autowired
  private AccountOrderRepository accountOrderRepository;

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private OrderInformationRepository orderInformationRepository;

  @Autowired
  private OrderDetailRepository orderDetailRepository;

  @Autowired
  private IProductWarrantyServices productWarrantyServices;

  @Autowired
  private IEmailServices emailServices;

  @Autowired
  private IOrderDetailServices orderDetailServices;

  @Autowired
  private IOrderInformationServices orderInformationServices;

  @Autowired
  private IAccountServices accountServices;

  @Override
  public AccountOrder createOrder(CreateOrderRequest request, String username)
      throws NumberFormatException, SQLException, MessagingException {
    AccountOrder newOrder = AccountOrder.builder().username(username).total(request.getTotal())
        .status(OrderStatus.PENDING)
        .account(this.accountRepository.findByUsername(username).get())
        .build();
    AccountOrder createdOrder = this.accountOrderRepository.save(newOrder);
    this.orderDetailServices.createOrderDetail(request.getCartItems(), createdOrder);
    OrderInformation orderInformation = OrderInformation.builder()
        .address(request.getFullAddress())
        .fullname(request.getFullName())
        .email(request.getEmail())
        .phoneNumber(request.getPhoneNumber())
        .note(request.getNote())
        .accountOrder(createdOrder)
        .username(username)
        .build();
    this.orderInformationServices.createOrderInformation(orderInformation);
    emailServices.sendOrderUser(request, username);
    return createdOrder;
  }

  @Override
  public List<AccountOrder> getAllOrders() {
    return accountOrderRepository.findAll();
  }

  @Override
  public List<AccountOrder> getOrders(String username) {
    List<AccountOrder> accountOrders = accountOrderRepository.findByUsername(username);
    return accountOrders;
  }

  @Override
  public AccountOrder getOrderByUsername(String username) {
    Optional<AccountOrder> opt = accountOrderRepository.findUsername(username);
    if (opt.isPresent()) {
      return opt.get();
    } else {
      throw new ResourceNotFoundException("Cannot found orderUser with name: " + username + " Not Found");
    }
  }

  @Override
  public AccountOrder updateOrderStatus(@Valid UpdateStatusRequest request) {
    AccountOrder fetchedOrder = this.accountOrderRepository.findById(request.getOrderId()).get();
    fetchedOrder.setStatus(request.getOrderStatus());
    return this.accountOrderRepository.save(fetchedOrder);
  }

  @Override
  public AccountOrder cancelOrder(Integer orderId) {
    AccountOrder fetchedOrder = this.accountOrderRepository.findById(orderId).get();
    fetchedOrder.setStatus(OrderStatus.CANCELED);
    List<OrderDetail> orderDetails = this.orderDetailRepository.findAllByOrderId(orderId).get();
    for (OrderDetail orderDetail : orderDetails) {
      ProductWarranty productWarranty = orderDetail.getProductWarranty();
      this.productWarrantyServices.deactiveWarranty(productWarranty.getId());
    }
    return this.accountOrderRepository.save(fetchedOrder);
  }

  @Override
  public AccountOrder confirmOrder(Integer orderId, String username) {
    AccountOrder fetchedOrder = this.accountOrderRepository.findById(orderId).get();
    fetchedOrder.setStatus(OrderStatus.CONFIRMED);
    fetchedOrder.setConfirmedBy(this.accountServices.getAccountByUserName(username));
    return this.accountOrderRepository.save(fetchedOrder);
  }

  @Override
  public OrderDetailResponse getOrderDetail(String username, Integer orderId) {
    Optional<OrderInformation> optionalOrderInfo = this.orderInformationRepository.findByOrderId(orderId);
    if (!optionalOrderInfo.isPresent()) {
      throw new ResourceNotFoundException("Order not found");
    }
    OrderInformation orderInformation = optionalOrderInfo.get();
    List<OrderDetail> orderDetails = this.orderDetailRepository.findAllByOrderId(orderId).get();
    List<OrderItemDTO> orderItems = new ArrayList<OrderItemDTO>();
    for (OrderDetail orderDetail : orderDetails) {
      Product product = orderDetail.getProductWarranty().getProduct();
      orderItems.add(
          OrderItemDTO.builder()
              .productLine(product.getProductLine())
              .productName(product.getProductName())
              .discount(orderDetail.getPurchaseDiscount())
              .price(orderDetail.getPurchasePrice())
              .productSN(orderDetail.getProductWarranty().getProductWarrantyId())
              .warrantyDate(orderDetail.getProductWarranty().getWarrantyPeriod())
              .build());
    }

    return OrderDetailResponse.builder().orderInformation(orderInformation).orderItems(orderItems)
        .orderStatus(orderInformation.getAccountOrder().getStatus()).build();
  }

  @Override
  public List<MonthlyRevenue> getMongMonthlyRevenues() {
    return this.accountOrderRepository.getMonthlyRevenues();
  }

  @Override
  public List<TrustedBuyer> getTrustedBuyers() {
    return this.accountOrderRepository.getTrustedBuyers();
  }
}
