package com.vehicle.service;

import com.vehicle.payloads.Response;
import com.vehicle.payloads.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserServices {
    boolean createUser(UserDto dto);
    boolean createAdminUser(UserDto dto);
    Response verifyUser(String email, String password);
    void deleteUser(Integer id);

    List<UserDto> getAllUser();
}
