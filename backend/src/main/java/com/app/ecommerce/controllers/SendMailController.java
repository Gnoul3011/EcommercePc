package com.app.ecommerce.controllers;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.DTO.order.CreateOrderRequest;
import com.app.ecommerce.DTO.sendmail.sendmailDTO;
import com.app.ecommerce.models.Account;
import com.app.ecommerce.services.IEmailServices;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController // This means that this class is a Controller
@RequestMapping(value = "/mail") // This means URL's start with /demo (afterApplication path)
@RequiredArgsConstructor
@CrossOrigin
public class SendMailController {

    @Autowired
    private IEmailServices emailServices;

    @PatchMapping("/sendmail")
    public ResponseEntity<Account> sendMail(
            @RequestBody sendmailDTO sendmail)
            throws UnsupportedEncodingException, MessagingException {
        // String siteURL = Utilities.getSiteURL(request);
        return new ResponseEntity<Account>(emailServices.sendOTPbyEmail(sendmail), HttpStatus.OK);
    }

    @PostMapping("/sendorder")
    public void sendOrder(
            @RequestBody CreateOrderRequest request)
            throws UnsupportedEncodingException, MessagingException {
        // String siteURL = Utilities.getSiteURL(request);
        emailServices.sendOrderUser(request, "trinhq011@gmail.com");
    }
}
