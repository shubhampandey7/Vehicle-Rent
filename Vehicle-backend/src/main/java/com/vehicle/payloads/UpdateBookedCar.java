package com.vehicle.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBookedCar {
    private Integer  id;
    private Integer carId;
    private Integer days;
    private Integer quantity;

    }
