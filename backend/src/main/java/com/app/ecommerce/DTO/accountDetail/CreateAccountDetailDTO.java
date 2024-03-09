package com.app.ecommerce.DTO.accountDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateAccountDetailDTO {
    private String firstName;

    private String lastName;

    private String detailedAddress;

    private String district;

    private String city;

    private String email;

    private String phoneNumber;

}
