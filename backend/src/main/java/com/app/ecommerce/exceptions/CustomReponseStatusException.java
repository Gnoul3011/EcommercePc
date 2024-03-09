package com.app.ecommerce.exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

import lombok.Getter;

@Getter
public class CustomReponseStatusException extends ResponseStatusException {
  private String errorMessage;

  public CustomReponseStatusException(HttpStatusCode status, String errorMessage) {
    super(status);
    this.errorMessage = errorMessage;
  }
  

}
