package com.app.ecommerce.DTO.OrderInformation;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrderInformation {
    @Nullable
    private String address;
    @Nullable
    private String note;
    @Nullable
    private String email;
    @Nullable
    private String phoneNumber;
}
