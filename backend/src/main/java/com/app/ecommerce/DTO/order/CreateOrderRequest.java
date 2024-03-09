package com.app.ecommerce.DTO.order;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderRequest {
  private String firstName;
  private String lastName;
  private String phoneNumber;
  private String email;
  private String city;
  private String district;
  private String detailedAddress;
  private String note;
  private List<CartItem> cartItems;
  private int total;

  public String getFullName() {
    return firstName + " " + lastName;
  }

  public String getFullAddress() {
    return detailedAddress + ", " + district + ", " + city;
  }
}
