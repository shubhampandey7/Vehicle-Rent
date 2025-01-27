package com.vehicle.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String mobile;
    private String role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println("GrantedAuthority");
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        System.out.println("getting password");
        return password;
    }

    @Override
    public String getUsername() {
        System.out.println("User email id");
        return email;
    }

   }
