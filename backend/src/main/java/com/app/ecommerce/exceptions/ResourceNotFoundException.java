package com.app.ecommerce.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends ResponseStatusException {
    
    public ResourceNotFoundException(String messageString) {
        super(HttpStatusCode.valueOf(404), messageString);
    }
}
