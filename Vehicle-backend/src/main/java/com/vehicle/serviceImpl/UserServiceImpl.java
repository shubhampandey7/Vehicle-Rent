package com.vehicle.serviceImpl;

import com.vehicle.entity.User;


import com.vehicle.payloads.Response;
import com.vehicle.payloads.UserDto;
import com.vehicle.repository.UserRepo;
import com.vehicle.service.UserServices;
import com.vehicle.utils.JwtUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserServices {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder bcryptPasswordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtils jwtUtils;

    private User dtoToUser(UserDto dto){
        return this.modelMapper.map(dto, User.class);

    }
    private UserDto userToDto(User ur){
        return this.modelMapper.map(ur, UserDto.class);

    }

    @Override
    public boolean createUser(UserDto dto) {

       var user=this.userRepo.findByEmail(dto.getEmail());
        if(user.isEmpty()) {
            User ur = this.dtoToUser(dto);
            ur.setPassword(bcryptPasswordEncoder.encode(dto.getPassword()));
            ur.setRole("User");
            this.userRepo.save(ur);
            return true;
        }
        return false;
    }

    @Override
    public boolean createAdminUser(UserDto dto) {
        var user=this.userRepo.findByEmail(dto.getEmail());

        if(user.isEmpty()) {
            User ur = dtoToUser(dto);
            ur.setRole("Admin");
            ur.setPassword(bcryptPasswordEncoder.encode(dto.getPassword()));
            this.userRepo.save(ur);
            return true;
        }
        return false;
    }

    @Override
    public Response verifyUser(String email, String password) {

        Response response=new Response();

       try {
           authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
           System.out.println("after authorization");
           var ur=this.userRepo.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found!!"));
           response.setRole(ur.getRole());
           response.setToken(jwtUtils.generateToken(ur));
           response.setMessage("Logged Successfully!!");
            response.setStatusCode(200);
       } catch (UsernameNotFoundException e) {
           response.setMessage("Invalid Credential !!");
           response.setStatusCode(403);
       }
       return response;

    }

    @Override
    public void deleteUser(Integer id) {
        this.userRepo.deleteById(id);
    }

    @Override
    public List<UserDto> getAllUser() {

        List<User> ul=this.userRepo.findAll();
        return ul.stream().map(this::userToDto).collect(Collectors.toList());

    }

}
