package com.playo.exceptions;

public class CustomAuthenticationException extends RuntimeException {
    public CustomAuthenticationException(String message) {
        super(message);
        System.out.println("CustomAuthenticationException");

    }
}