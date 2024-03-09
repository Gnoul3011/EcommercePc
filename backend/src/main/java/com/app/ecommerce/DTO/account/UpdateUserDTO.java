package com.app.ecommerce.DTO.account;

import java.util.List;
import com.app.ecommerce.models.AccountDetail;
import com.app.ecommerce.models.AccountOrder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDTO {
    private String username;
    private String oldPassword;
    private String password;    
    private List<AccountDetail> accountDetails;
    private List<AccountOrder> accountOrders;
}
