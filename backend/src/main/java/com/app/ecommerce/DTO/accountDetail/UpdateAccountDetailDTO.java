package com.app.ecommerce.DTO.accountDetail;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAccountDetailDTO {
    @Nullable
    private String firstName;
    @Nullable
    private String lastName;
    @Nullable
    private String detailedAddress;
    @Nullable
    private String district;
    @Nullable
    private String city;
    @Nullable
    private String phoneNumber;
    @Nullable
    private String email;
}
