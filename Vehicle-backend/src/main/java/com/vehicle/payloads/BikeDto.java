package com.vehicle.payloads;

import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BikeDto {
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

    @Lob
    private byte[] image;
}
