package com.vehicle.payloads;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginDetails {
    private String email;
    private String password;

   }
