package com.vehicle.repository;


import com.vehicle.entity.CarBooked;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarBookRepo extends JpaRepository<CarBooked,Integer> {
    List<CarBooked> findByUserEmail(String email);
    CarBooked findByIdAndCarId(Integer id,Integer carId);
}
