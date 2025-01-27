package com.vehicle.repository;

import com.vehicle.entity.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BikeRepo extends JpaRepository<Bike,Integer> {

    List<Bike> findByBrand(String brand);
}
