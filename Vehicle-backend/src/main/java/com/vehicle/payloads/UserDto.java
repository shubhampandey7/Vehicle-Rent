package com.vehicle.payloads;



import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private Integer id;
    @NotNull(message = "Should not be NUll!!")
    @NotEmpty(message = "Should not be empty!!")
    @Size(min = 3 ,message = "Should not be empty!!")
    private String name;
    @NotEmpty
    @Email(message = "Please enter valid email id")
    @NotNull
    @Pattern(regexp="^[a-z0-9]+[@]+[a-z0-9]+[.]+[a-z0-9]+$",message = "Please enter valid mail")
    private String email;
    @NotEmpty
    @NotNull
    @Size(min = 5 ,message = "Please enter at least 5 character!!")
    private String password;
    @NotEmpty
    @NotNull
    @Size(min = 10,max = 10 ,message = "Valid mobile number")
    private String mobile;
    private String role;
}
