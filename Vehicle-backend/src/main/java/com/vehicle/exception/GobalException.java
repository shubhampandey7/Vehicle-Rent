package com.vehicle.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.HashMap;

@RestControllerAdvice
public class GobalException {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> usernameNotFoundException(UsernameNotFoundException ex){
        return ResponseEntity.ok().body(ex.getMessage());
    }

    @ExceptionHandler(InvalidUser.class)
    public ResponseEntity<?> InvalidUser(InvalidUser ex){
        return ResponseEntity.ok().body(false);
    }



    @ExceptionHandler(IOException.class)
    public ResponseEntity<?> IOException(IOException ex){

        return ResponseEntity.ok().body(ex.getMessage());
    }


    @ExceptionHandler(InvalidEmail.class)
    public ResponseEntity<?> InvalidEmail(InvalidEmail ex){
        String msg=ex.getError();
        return ResponseEntity.ok().body(msg);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValidException(MethodArgumentNotValidException ex){
        HashMap<String,String>map=new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((er)->{

            String fieldName=((FieldError) er).getField();
            String error= er.getDefaultMessage();
            map.put(fieldName,error);
        });
        return new ResponseEntity<>(map,HttpStatus.BAD_REQUEST);
    }
}
