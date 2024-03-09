package com.app.ecommerce.DTO.order;

import java.math.BigInteger;

public interface TrustedBuyer {
  BigInteger getTotal();
  Integer getTotalOrder();
  String getUsername();
}
