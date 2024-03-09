package com.app.ecommerce.services.implement;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.app.ecommerce.DTO.OrderInformation.UpdateOrderInformation;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.OrderInformation;
import com.app.ecommerce.respositories.OrderInformationRepository;
import com.app.ecommerce.services.IOrderInformationServices;

@Service
public class OrderInformationImp implements IOrderInformationServices {

  @Autowired
  private OrderInformationRepository orderInformationRepository;

  @Override
  public OrderInformation createOrderInformation(OrderInformation orderInformation) {
    return this.orderInformationRepository.save(orderInformation);
  }

  @Override
  public OrderInformation getOrderInformationById(int id) {
    Optional<OrderInformation> opt = orderInformationRepository.findById(id);
    if (opt.isPresent()) {
      return opt.get();
    } else {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "OrderInformation with Id : " + id + " Not Found");
    }
  }

  @Override
  public OrderInformation updateOrderInformation(int id, UpdateOrderInformation request) {
    Optional<OrderInformation> found = orderInformationRepository.findById(id);
    if (found.isPresent()) {
      var orderInfor = found.get();
      orderInfor.setAddress(request.getAddress().isEmpty() ? orderInfor.getAddress() : request.getAddress());
      orderInfor.setNote(request.getNote().isEmpty() ? orderInfor.getNote() : request.getNote());
      orderInfor.setEmail(request.getEmail().isEmpty() ? orderInfor.getEmail() : request.getEmail());
      orderInfor
          .setPhoneNumber(request.getPhoneNumber().isEmpty() ? orderInfor.getPhoneNumber() : request.getPhoneNumber());
      return orderInformationRepository.save(orderInfor);
    } else {
      throw new ResourceNotFoundException("OrderInformation with id: " + id + " Not Found");
    }
  }
}
