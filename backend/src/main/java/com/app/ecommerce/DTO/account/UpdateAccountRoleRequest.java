package com.app.ecommerce.DTO.account;

import com.app.ecommerce.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAccountRoleRequest {
  private String username;
  private Role role;
}
