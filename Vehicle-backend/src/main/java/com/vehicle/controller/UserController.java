package com.vehicle.controller;

import com.vehicle.payloads.LoginDetails;
import com.vehicle.payloads.Response;
import com.vehicle.payloads.UserDto;
import com.vehicle.serviceImpl.UserServiceImpl;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicle/user")
public class UserController {
    @Autowired
    private UserServiceImpl userServiceImpl;

    @PreAuthorize("hasAuthority('Admin')")
    @PostMapping("/createAdmin")
    public ResponseEntity<?> createAdminUser(@Valid @RequestBody UserDto dto){
        boolean msg=this.userServiceImpl.createAdminUser(dto);
        return ResponseEntity.ok(msg);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDto dto){

        boolean msg=this.userServiceImpl.createUser(dto);
        return ResponseEntity.ok(msg);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDetails lgd){
        Response msg=this.userServiceImpl.verifyUser(lgd.getEmail(),lgd.getPassword());
        return ResponseEntity.status(msg.getStatusCode()).body(msg);
    }


    @GetMapping("/")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<List<UserDto>>  allUser(){
            List<UserDto> dl=this.userServiceImpl.getAllUser();
        return ResponseEntity.ok(dl);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id){
        this.userServiceImpl.deleteUser(id);
        return ResponseEntity.ok(true);
    }

}
