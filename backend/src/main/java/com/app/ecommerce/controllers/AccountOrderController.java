package com.app.ecommerce.controllers;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.DTO.order.CreateOrderRequest;
import com.app.ecommerce.DTO.order.MonthlyRevenue;
import com.app.ecommerce.DTO.order.OrderDetailResponse;
import com.app.ecommerce.DTO.order.TrustedBuyer;
import com.app.ecommerce.DTO.order.UpdateStatusRequest;
import com.app.ecommerce.config.JwtService;
import com.app.ecommerce.models.AccountOrder;
import com.app.ecommerce.models.OrderStatus;
import com.app.ecommerce.respositories.AccountOrderRepository;
import com.app.ecommerce.services.IAccountOrderServices;
import com.app.ecommerce.services.implement.ExportExcelServicesImp;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@CrossOrigin
public class AccountOrderController {

  @Autowired
  private IAccountOrderServices orderServices;

  @Autowired
  private JwtService jwtService;

  @Autowired
  private AccountOrderRepository repo;

  @GetMapping("/getOrder")
  public @ResponseBody ResponseEntity<List<AccountOrder>> getAccountOrderByUsername(
      @RequestHeader("Authorization") String authorization) {
    String token = authorization.split(" ")[1].trim();
    String username = this.jwtService.extractUsername(token);
    List<AccountOrder> orders = orderServices.getOrders(username);
    return new ResponseEntity<List<AccountOrder>>(orders, HttpStatus.OK);
  }

  @GetMapping("/getAllOrder")
  public @ResponseBody ResponseEntity<List<AccountOrder>> getAllOrder() {
    List<AccountOrder> orders = orderServices.getAllOrders();
    return new ResponseEntity<List<AccountOrder>>(orders, HttpStatus.OK);
  }

  @PostMapping("/create")
  public ResponseEntity<AccountOrder> create(
      @Valid @RequestBody CreateOrderRequest request, @RequestHeader("Authorization") String authorization)
      throws NumberFormatException, SQLException, MessagingException {
    String token = authorization.split(" ")[1].trim();
    String username = this.jwtService.extractUsername(token);
    return ResponseEntity.ok(orderServices.createOrder(request, username));
  }

  @PatchMapping("/update-status")
  public ResponseEntity<AccountOrder> updateStatus(
      @Valid @RequestBody UpdateStatusRequest request, @RequestHeader("Authorization") String authorization) {
    String token = authorization.split(" ")[1].trim();
    String username = this.jwtService.extractUsername(token);
    if (request.getOrderStatus().equals(OrderStatus.CANCELED)) {
      return ResponseEntity.ok(orderServices.cancelOrder(request.getOrderId()));
    }
    if (request.getOrderStatus().equals(OrderStatus.CONFIRMED)) {
      return ResponseEntity.ok(orderServices.confirmOrder(request.getOrderId(), username));
    }
    return ResponseEntity.ok(orderServices.updateOrderStatus(request));
  }

  @GetMapping("/export/excel")
  public void exportToExcel(HttpServletResponse response) throws IOException {
    response.setContentType("application/octet-stream");
    // java.util.Date date = new java.util.Date();
    // DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
    // String currentDateTime = dateFormatter.format(date);

    String headerKey = "Content-Disposition";
    // String headerValue = "attachment; filename=users_" + currentDateTime +
    // ".xlsx";
    String headerValue = "attachment; filename=users_" + ".xlsx";
    response.setHeader(headerKey, headerValue);

    List<AccountOrder> accountOrders = repo.findAll();
    ExportExcelServicesImp test = new ExportExcelServicesImp(accountOrders);
    test.export(response);
  }

  @GetMapping("/getOrderDetail")
  public ResponseEntity<OrderDetailResponse> getOrderDetail(@RequestHeader("Authorization") String authorization,
      @RequestParam String id) {
    String token = authorization.split(" ")[1].trim();
    String username = this.jwtService.extractUsername(token);
    return ResponseEntity.ok(this.orderServices.getOrderDetail(username, Integer.parseInt(id)));
  }

  @GetMapping("/getMonthlyRevenue")
  public ResponseEntity<List<MonthlyRevenue>> getMonthlyRevenue() {
    return ResponseEntity.ok(this.orderServices.getMongMonthlyRevenues());
  }

  @GetMapping("/getTrustedBuyers")
  public ResponseEntity<List<TrustedBuyer>> getTrustedBuyers() {
    return ResponseEntity.ok(this.orderServices.getTrustedBuyers());
  }
}
