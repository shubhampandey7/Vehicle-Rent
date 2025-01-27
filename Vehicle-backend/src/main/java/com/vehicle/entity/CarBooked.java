package com.vehicle.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CarBooked {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer carId;
    private String userEmail;
    private String carName;
    private String hireDate;
    private String carBrand;
    private Integer totalQuantity;
    private Integer rate;
    private Integer totalPrice;
    private Integer days;


}
