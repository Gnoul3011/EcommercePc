package com.app.ecommerce.DTO.account;

import com.app.ecommerce.decorators.StringsEqual;

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
public class UpdatePasswordDTO {
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$", message = "password must contain at least on upper character,"
            +
            " 1 special character and 1 numbers and at least 8 characters long")
    private String password;

    private String confirmPassword;

    private String verificationCode;
}
