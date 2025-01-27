package com.vehicle.payloads;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BikeBookedDto {
    private Integer id;
    private Integer bikeId;
    private String userEmail;
    private String bikeName;
    private String bikeBrand;
    private Integer totalQuantity;
    private Integer totalPrice;
    private Integer days;
    private Integer rate;
    private String hireDate;
}
