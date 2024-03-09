package com.app.ecommerce.services;

import com.app.ecommerce.DTO.order.CreateOrderRequest;
import com.app.ecommerce.DTO.sendmail.sendmailDTO;
import com.app.ecommerce.models.Account;

import jakarta.mail.MessagingException;

public interface IEmailServices {
    public Account sendOTPbyEmail(sendmailDTO sendmail) throws MessagingException;

    public void sendOrderUser(CreateOrderRequest request, String username) throws MessagingException;
}
