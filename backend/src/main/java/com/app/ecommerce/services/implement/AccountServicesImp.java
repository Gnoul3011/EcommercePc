package com.app.ecommerce.services.implement;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.app.ecommerce.DTO.account.AdminUpdateUserDTO;
import com.app.ecommerce.DTO.account.ChangePasswordDTO;
import com.app.ecommerce.DTO.account.UpdateMailDTO;
import com.app.ecommerce.DTO.account.UpdatePasswordDTO;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.Account;
import com.app.ecommerce.models.Role;
import com.app.ecommerce.respositories.AccountRepository;
import com.app.ecommerce.services.IAccountServices;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServicesImp implements IAccountServices {

    @Autowired
    private AccountRepository repo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Account saveAccount(Account account) {
        return repo.save(account);
    }

    @Override
    public List<Account> getAccounts(boolean active) {
        if (active == true) {
            return repo.findAllAccountActive();
        }
        return repo.findAll();
    }

    @Override
    public Account getAccountById(int id) {
        Optional<Account> opt = repo.findById(id);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Account with Id : " + id + " Not Found");
        }
    }

    @Override
    public Account getAccountByUserName(String username) {
        Optional<Account> opt = repo.findByUsername(username);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            throw new ResourceNotFoundException("User with username : " + username + " Not Found");
        }
    }

    @Override
    public Account updatePassword(String email, UpdatePasswordDTO request) {
        Optional<Account> opt = repo.findByEmail(email);
        if (opt.isPresent()) {
            var user = opt.get();
            var otp = request.getVerificationCode();
            if (otp.compareTo(user.getVerificationCode()) == -1) {
                throw new ResourceNotFoundException("OTP is not correct");
            }
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setVerificationCode(null);
            return repo.save(user);
        } else {
            throw new ResourceNotFoundException("User with mail : " + email + " Not Found");
        }
    }

    @Override
    public Account changePassword(String username, ChangePasswordDTO request) {
        Optional<Account> opt = repo.findByUsername(username);
        if (opt.isPresent()) {
            var user = opt.get();
            var oldpassword = request.getOldpassword();
            if (oldpassword.compareTo(user.getPassword()) == -1) {
                throw new ResourceNotFoundException("Old Password is not correct");
            }
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            return repo.save(user);
        } else {
            throw new ResourceNotFoundException("User with username : " + username + " Not Found");
        }
    }

    @Override
    public Account updateMail(String email, UpdateMailDTO request) {
        Optional<Account> opt = repo.findByEmail(email);
        if (opt.isPresent()) {
            var user = opt.get();
            var oldMail = request.getOldEmail();
            var otp = request.getVerificationCode();

            if (oldMail.compareTo(user.getEmail()) == -1) {
                throw new ResourceNotFoundException("Old Mail is not correct");
            }

            if (otp.compareTo(user.getVerificationCode()) == -1) {
                throw new ResourceNotFoundException("OTP is not correct");
            }

            user.setEmail(request.getEmail());
            user.setVerificationCode(null);
            return repo.save(user);
        } else {
            throw new ResourceNotFoundException("User with mail : " + email + " Not Found");
        }
    }

    @Override
    public Account activeAccount(String id) {
        Optional<Account> accountFound = repo.findById(Integer.parseInt(id));
        if (accountFound.isPresent()) {
            // Get value accoutFound
            var account = accountFound.get();
            account.setDeletedAt(null);
            return repo.save(account);
        } else {
            throw new ResourceNotFoundException("Account with Id : " + id + " Not Found To Delete");
        }
    }

    @Override
    public void softDeleteAccount(int id) {
        Optional<Account> accountFound = repo.findById(id);
        if (accountFound.isPresent()) {
            // Create date
            Date date = new Date();
            Timestamp timestamp = new Timestamp(date.getTime());

            // Get value accoutFound
            var account = accountFound.get();
            account.setDeletedAt(timestamp);
            repo.save(account);
        } else {
            throw new ResourceNotFoundException("Account with Id : " + id + " Not Found To Delete");
        }
    }

    @Override
    public Account updateRole(String username, Role role) {
        Optional<Account> accountFound = repo.findByUsername(username);
        if (accountFound.isPresent()) {
            var account = accountFound.get();
            account.setRole(role);
            return repo.save(account);
        } else {
            throw new ResourceNotFoundException("Account with username : " + username + " Not Found");
        }
    }

    @Override
    public Account updateAccountInfo(AdminUpdateUserDTO request) {
        Optional<Account> optAccount = repo.findByUsername(request.getUsername());
        if (!optAccount.isPresent()) {
            throw new ResourceNotFoundException("Account with username : " + request.getUsername() + " Not Found");
        }
        Account account = optAccount.get();
        if (!account.getPassword().isEmpty()) {
            account.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        account.setEmail(request.getEmail());
        account.setRole(request.getRole());
        return this.repo.save(account);
    }

}
