package com.vehicle.payloads;

import jakarta.persistence.Lob;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
@NoArgsConstructor
public class CarDto {
    private Integer id;

    private String brand;

    private String color;

    private String name;

    private String type;

    private String transmission;
    private Integer quantity;
    private String description;
    private Integer price;
    private String model;
    private String mileage;
    private Date date;
    @Lob
    private byte[] image;

    }
