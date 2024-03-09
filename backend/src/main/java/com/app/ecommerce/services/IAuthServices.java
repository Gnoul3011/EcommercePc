package com.app.ecommerce.services;

import com.app.ecommerce.DTO.auth.AuthenticationRequest;
import com.app.ecommerce.DTO.auth.AuthenticationResponse;
import com.app.ecommerce.DTO.auth.RegisterRequest;

public interface IAuthServices {
  public AuthenticationResponse register(RegisterRequest request);

  public AuthenticationResponse authenticate(AuthenticationRequest request);
}
