package com.vehicle.payloads;

import lombok.Data;

@Data
public class Response {
    private String token;
    private String role;
    private String message;
    private Integer statusCode;
}
