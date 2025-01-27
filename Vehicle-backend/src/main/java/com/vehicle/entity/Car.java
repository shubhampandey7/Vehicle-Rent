package com.vehicle.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.sql.Date;
@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String brand;
    private String color;
    private String name;
    private String type;
    private String transmission;
    private String description;
    private Integer price;
    private Integer quantity;
    private Date date;
    private String imageName;
    private String model;
    private String imageType;
    private String mileage;
    @Lob
    private byte[] image;

   }
