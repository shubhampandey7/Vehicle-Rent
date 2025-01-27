package com.vehicle.payloads;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateBookedBike {
    private Integer  id;
    private Integer bikeId;
    private Integer days;
    private Integer quantity;
}
