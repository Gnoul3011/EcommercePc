package com.app.ecommerce.services;

import java.util.List;

import com.app.ecommerce.DTO.account.AdminUpdateUserDTO;
import com.app.ecommerce.DTO.account.ChangePasswordDTO;
import com.app.ecommerce.DTO.account.UpdateMailDTO;
import com.app.ecommerce.DTO.account.UpdatePasswordDTO;
import com.app.ecommerce.models.Account;
import com.app.ecommerce.models.Role;

public interface IAccountServices {
    public List<Account> getAccounts(boolean active);

    public Account updatePassword(String id, UpdatePasswordDTO request);

    public Account changePassword(String ussername, ChangePasswordDTO request);

    public Account updateMail(String mail, UpdateMailDTO request);

    public Account updateRole(String username, Role role);

    public Account saveAccount(Account account);

    public Account getAccountById(int id);

    public Account getAccountByUserName(String username);

    public Account activeAccount(String id);

    public void softDeleteAccount(int id);

    public Account updateAccountInfo(AdminUpdateUserDTO request);
}
