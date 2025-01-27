package com.vehicle.repository;

import com.vehicle.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CarRepo extends JpaRepository<Car,Long> {
    Car findById(Integer id);
    List<Car>findByBrand(String brand);



}
