package com.app.ecommerce.DTO.account;

import java.util.Date;

import com.app.ecommerce.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimpleAccountDTO {
  private Integer id;

  private String username;

  private String email;

  private Role role;

  private Date createdAt;

  private Date deletedAt;
}
