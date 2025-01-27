package com.vehicle.payloads;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CarBookedDto {

    private Integer id;
    private Integer carId;
    private String userEmail;
    private String carName;
    private String carBrand;
    private Integer totalQuantity;
    private Integer totalPrice;
    private Integer days;
    private Integer rate;
    private String hireDate;

  }
