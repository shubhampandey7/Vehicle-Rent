package com.vehicle.entity;

import jakarta.persistence.*;
import lombok.Getter;

import lombok.Setter;




@Entity
@Getter
@Setter
public class Bike {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String brand;
    private String model;
    private String date;
    private String engineCapacity;
    private String mileage;
    private String tank;
    private String speed;
    private String engineStart;
    private Integer quantity;
    private Integer rate;
    private String imageType;
    private String imageName;
    @Lob
    private byte[] image;


}
