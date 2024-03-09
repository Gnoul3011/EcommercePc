package com.app.ecommerce.services.implement;

import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.ecommerce.DTO.auth.AuthenticationRequest;
import com.app.ecommerce.DTO.auth.AuthenticationResponse;
import com.app.ecommerce.DTO.auth.RegisterRequest;
import com.app.ecommerce.config.JwtService;
import com.app.ecommerce.models.Account;
import com.app.ecommerce.models.Role;
import com.app.ecommerce.respositories.AccountRepository;
import com.app.ecommerce.services.IAuthServices;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServicesImp implements IAuthServices {

  private final AccountRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationResponse register(RegisterRequest request) {
    Optional<Account> optAccount = this.repository.findByUsername(request.getUsername());
    if (optAccount.isPresent()) {
      throw new DataIntegrityViolationException("user with current username is already exist");
    }
    var account = Account.builder()
        .username(request.getUsername())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.USER)
        .build();
        try {
          repository.save(account);
        } catch(DataIntegrityViolationException ex) {
          throw new DataIntegrityViolationException("user with current email is already exist");
        }
    var jwtToken = jwtService.generateToken(account);
    return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getUsername(),
            request.getPassword()));
    var user = repository.findByUsername(request.getUsername()).orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();
  }

}
