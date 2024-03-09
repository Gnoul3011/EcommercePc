package com.app.ecommerce.services;

import java.util.List;

import com.app.ecommerce.DTO.accountDetail.CreateAccountDetailDTO;
import com.app.ecommerce.DTO.accountDetail.UpdateAccountDetailDTO;
import com.app.ecommerce.models.AccountDetail;

public interface IAccountDetailServices {
    public List<AccountDetail> getAllAccountDetails(boolean active);

    public AccountDetail getAccountDetailById(int accountDetailId);

    public AccountDetail saveAccountDetail(CreateAccountDetailDTO accountDetail, String username);

    public AccountDetail activeAccountDetailDefault(int id, String username);

    public AccountDetail updateAccountDetail(String id, UpdateAccountDetailDTO accountDetail);

    public AccountDetail getAccountDetailDefault(String username);    
    
    public List<AccountDetail> getAllAccountDetail(String username);

    public AccountDetail activeAccountDetail(String id);

    public void softDeleteAccountDetail(int id);
}