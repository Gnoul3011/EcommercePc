package com.app.ecommerce.DTO.sendmail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class sendMailInfoOrder {
    private String firstName;
    private String lastName;
    private String city;
    private String email;
    private String district;
    private String detailedAddress;
    private int total;

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public String getFullAddress() {
        return detailedAddress + ", " + district + ", " + city;
    }
}
