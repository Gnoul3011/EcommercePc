package com.app.ecommerce.DTO.auth;

import com.app.ecommerce.decorators.StringsEqual;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@StringsEqual(field1 = "password", field2 = "confirmPassword")
public class RegisterRequest {
  @NotEmpty
  public String username;

  @Email()
  public String email;

  @NotEmpty
  @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$", message = "password must contain at least on upper character,"
      +
      " 1 special character and 1 numbers and at least 8 characters long")
  public String password;

  public String confirmPassword;

}
