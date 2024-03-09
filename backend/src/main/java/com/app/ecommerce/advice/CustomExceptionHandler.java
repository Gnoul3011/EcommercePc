package com.app.ecommerce.advice;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.server.ResponseStatusException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.persistence.EntityExistsException;

@RestControllerAdvice
public class CustomExceptionHandler {
  @ExceptionHandler(Exception.class)
  public ProblemDetail handleSecurityException(Exception ex) {
    ProblemDetail errorDetail = null;
    if (ex instanceof BadCredentialsException) {
      errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), ex.getMessage());
      errorDetail.setProperty("reason", "authentication failure");
    }

    if (ex instanceof AccessDeniedException) {
      errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
      errorDetail.setProperty("reason", "not authorized");
    }

    if (ex instanceof ExpiredJwtException) {
      errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
      errorDetail.setProperty("reason", "token expired");
    }

    if (ex instanceof SignatureException) {
      errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
      errorDetail.setProperty("reason", "token not valid");
    }

    return errorDetail;
  }

  @ExceptionHandler(ResponseStatusException.class)
  public ProblemDetail handleStatusException(ResponseStatusException ex) {
    ProblemDetail errorDetail = null;
    if (ex instanceof ResponseStatusException) {
      errorDetail = ProblemDetail.forStatusAndDetail(ex.getStatusCode(), ex.getMessage());
    }
    return errorDetail;
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public Map<String, String> handleValidationExceptions(
      MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });
    return errors;
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(FileNotFoundException.class)
  public ProblemDetail handleFileNotFoundException(FileNotFoundException ex) {
    ProblemDetail errorDetail = null;
    if (ex instanceof FileNotFoundException) {
      errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(404), "File not found or not exist");
    }
    return errorDetail;
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ProblemDetail handleMessageNotReadable(HttpMessageNotReadableException ex) {
    ProblemDetail errorDetail = null;
    if (ex instanceof HttpMessageNotReadableException) {
      errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(400), "Provided value is invalid");
    }
    return errorDetail;
  }
  @ResponseStatus(HttpStatus.CONFLICT)
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ProblemDetail handleConflictException(RuntimeException ex) {
    ProblemDetail errorDetail = null;
    errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
    return errorDetail;
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MissingServletRequestPartException.class)
  public ProblemDetail handleMissingRequestPartException(MissingServletRequestPartException ex) {
    ProblemDetail errorDetail = null;
    errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
    return errorDetail;
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(EntityExistsException.class)
  public ProblemDetail handleEntityExistException(EntityExistsException ex) {
    ProblemDetail errorDetail = null;
    errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
    return errorDetail;
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
  public ProblemDetail handleMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
    ProblemDetail errorDetail = null;
    errorDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
    return errorDetail;
  }

}
