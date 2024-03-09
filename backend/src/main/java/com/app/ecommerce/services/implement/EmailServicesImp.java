package com.app.ecommerce.services.implement;

import java.util.Optional;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.app.ecommerce.DTO.order.CreateOrderRequest;
import com.app.ecommerce.DTO.sendmail.sendmailDTO;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.Account;
import com.app.ecommerce.respositories.AccountOrderRepository;
import com.app.ecommerce.respositories.AccountRepository;
import com.app.ecommerce.services.IEmailServices;
import com.app.ecommerce.utils.Utils;

import jakarta.mail.Authenticator;
import jakarta.mail.Message.RecipientType;
import jakarta.mail.MessagingException;
import jakarta.mail.Multipart;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;

@Service
public class EmailServicesImp implements IEmailServices {

    @Value("${spring.mail.host}")
    private String host;
    @Value("${spring.mail.username}")
    private String senderEmail;
    @Value("${spring.mail.password}")
    private String senderPassword;

    private JavaMailSender mailSender;

    @Autowired
    private AccountRepository repo;

    @Autowired
    private AccountOrderRepository repoAccountOrder;

    EmailServicesImp(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public Properties propertiesForSendMail() {
        Properties prop = new Properties();
        prop.put("mail.smtp.auth", true);
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        return prop;
    }

    public Session sessionFormSendMail() {
        Session session = Session.getInstance(propertiesForSendMail(), new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmail, senderPassword);
            }
        });
        return session;
    }

    @Override
    public Account sendOTPbyEmail(sendmailDTO sendmail) throws MessagingException {
        Optional<Account> userFound = repo.findByEmail(sendmail.getEmail());
        if (userFound.isPresent()) {
            var otp = Utils.generateOTP();
            var user = userFound.get();
            try {
                user.setVerificationCode(otp);
            } catch (Exception e) {
                throw new ResourceNotFoundException(user.getEmail() + " không tồn tại");
            }

            MimeMessage message = new MimeMessage(sessionFormSendMail());
            message.setFrom(senderEmail);
            message.setRecipients(
                    RecipientType.TO, user.getEmail());
            message.setSubject("EcommercePC send to " + user.getUsername() + ": OTP to authenticate your action");
            String msg = "<p><b> This is your OTP <span style=background-color:#FFF8DC; color: red; font-weight:bold; font-style:italic>"
                    + otp + " </span></b></p>";

            MimeBodyPart mimeBodyPart = new MimeBodyPart();
            mimeBodyPart.setContent(msg, "text/html; charset=utf-8");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(mimeBodyPart);

            message.setContent(multipart);

            Transport.send(message);

            return repo.save(user);
        } else {
            throw new ResourceNotFoundException("Account with id: " + sendmail.getEmail() + " Not Found");
        }
    }

    @Override
    public void sendOrderUser(CreateOrderRequest request, String username) throws MessagingException {
        int total = request.getTotal();
        String fullname = request.getFullName();
        String address = request.getDetailedAddress();
        String email = request.getEmail();
        int count = request.getCartItems().size();
        MimeMessage message = new MimeMessage(sessionFormSendMail());
        message.setFrom(senderEmail);
        message.setRecipients(
                RecipientType.TO, email);
        message.setSubject("EcommercePC send to" + username + "</span>"
                + ": Your order information");
        String msg = "<p>Fullname:  <span style=\"color:blue;font-weight:bold;\"> " + fullname + "</span></p>" +
                "<p>Your Address:" + address + "</p>" +
                "<p>The number of products:" + count + "</p>" +
                "<p>Total:" + total + "</p>";

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(msg, "text/html; charset=utf-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);

        message.setContent(multipart);

        Transport.send(message);
    }

}
