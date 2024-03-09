package com.app.ecommerce.DTO.account;
import com.app.ecommerce.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUpdateUserDTO {
  private String username;
  private String email;
  private String password;
  private Role role;
}
