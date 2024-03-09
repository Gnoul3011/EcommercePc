package com.app.ecommerce.DTO.accountDetail;

import com.app.ecommerce.models.AccountDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDetailResponse {
  private String email;
  private String username; 
  private AccountDetail accountDetail;
}
