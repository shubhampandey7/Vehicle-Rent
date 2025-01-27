package com.vehicle.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter

public class BikeBooked {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String hireDate;
    private Integer bikeId;
    private String userEmail;
    private String bikeName;
    private String bikeBrand;
    private Integer totalQuantity;
    private Integer totalPrice;
    private Integer days;
    private Integer rate;
}
