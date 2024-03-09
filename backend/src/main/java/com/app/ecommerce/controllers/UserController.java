package com.app.ecommerce.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.QueryParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.DTO.account.AdminUpdateUserDTO;
import com.app.ecommerce.DTO.account.ChangePasswordDTO;
import com.app.ecommerce.DTO.account.SimpleAccountDTO;
import com.app.ecommerce.DTO.account.UpdateAccountRoleRequest;
import com.app.ecommerce.DTO.account.UpdateMailDTO;
import com.app.ecommerce.DTO.account.UpdatePasswordDTO;
import com.app.ecommerce.config.JwtService;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.Account;
import com.app.ecommerce.services.IAccountServices;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController // This means that this class is a Controller
@RequestMapping(value = "/user") // This means URL's start with /demo (after Application path)
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    @Autowired
    private IAccountServices accountServices;

    @Autowired
    private JwtService jwtService;

    @GetMapping(value = "/all")
    public @ResponseBody ResponseEntity<Object> getUsers(@RequestParam Boolean active) {
        try {
            List<Account> listUsers = accountServices.getAccounts(active);

            List<SimpleAccountDTO> responseUsers = new ArrayList<SimpleAccountDTO>();

            for (Account user : listUsers) {
                responseUsers.add(SimpleAccountDTO.builder().id(user.getId()).username(user.getUsername())
                        .role(user.getRole()).createdAt(user.getCreatedAt()).deletedAt(user.getDeletedAt())
                        .email(user.getEmail()).build());
            }

            return new ResponseEntity<Object>(responseUsers, HttpStatus.OK);
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Can't have any user in list");
        }
    }

    @GetMapping(value = "/{username}")
    public @ResponseBody ResponseEntity<Object> findAccount(@PathVariable String username) {
        try {
            Account user = accountServices.getAccountByUserName(username);
            SimpleAccountDTO simpleUser = SimpleAccountDTO.builder().id(user.getId()).username(user.getUsername())
                    .role(user.getRole()).createdAt(user.getCreatedAt()).deletedAt(user.getDeletedAt())
                    .email(user.getEmail()).build();
            return new ResponseEntity<>(simpleUser, HttpStatus.OK);
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("user not found");
        }
    }

    @GetMapping(value = "/getAccount")
    public @ResponseBody ResponseEntity<Object> getAccount(@RequestHeader("Authorization") String authorization) {
        try {
            String token = authorization.split(" ")[1].trim();
            String username = this.jwtService.extractUsername(token);
            Account user = accountServices.getAccountByUserName(username);
            SimpleAccountDTO simpleUser = SimpleAccountDTO.builder().id(user.getId()).username(user.getUsername())
                    .role(user.getRole()).createdAt(user.getCreatedAt()).deletedAt(user.getDeletedAt())
                    .email(user.getEmail()).build();
            return new ResponseEntity<>(simpleUser, HttpStatus.OK);
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("user not found");
        }
    }

    @PatchMapping(value = "/{email}/updatepassword")
    public ResponseEntity<Account> updatePasswordUser(@PathVariable("email") String email,
            @Valid @RequestBody UpdatePasswordDTO password) {
        return ResponseEntity.ok(accountServices.updatePassword(email, password));
    }

    @PatchMapping(value = "/updatemail")
    public ResponseEntity<Account> updateMailUser(@RequestHeader("Authorization") String authorization,
            @Valid @RequestBody UpdateMailDTO password) {
        try {
            String token = authorization.split(" ")[1].trim();
            String username = this.jwtService.extractUsername(token);
            return ResponseEntity.ok(accountServices.updateMail(username, password));
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("user not found");
        }
    }

    @PatchMapping(value = "/changepassword")
    public ResponseEntity<Account> ChangePasswordUser(@RequestHeader("Authorization") String authorization,
            @Valid @RequestBody ChangePasswordDTO password) {
        try {
            String token = authorization.split(" ")[1].trim();
            String username = this.jwtService.extractUsername(token);
            return ResponseEntity.ok(accountServices.changePassword(username, password));
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("user not found");
        }
    }

    @PatchMapping(value = "/{id}/active")
    public ResponseEntity<Account> activeUser(@PathVariable String id) {
        return ResponseEntity.ok(accountServices.activeAccount(id));
    }

    @PatchMapping(value = "/update-role")
    public ResponseEntity<Account> updateAccountRole(@Valid @RequestBody UpdateAccountRoleRequest request) {
        return ResponseEntity.ok(accountServices.updateRole(request.getUsername(), request.getRole()));
    }

    @DeleteMapping(value = "/delete")
    public void deleteUser(@QueryParam("id") String id) {
        accountServices.softDeleteAccount(Integer.parseInt(id));
    }

    @PatchMapping(value = "/update-info")
    public ResponseEntity<Account> updateUser(@RequestBody AdminUpdateUserDTO updateUserDTO) {
        return ResponseEntity.ok(accountServices.updateAccountInfo(updateUserDTO));
    }
}
