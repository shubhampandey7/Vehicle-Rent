package com.vehicle.repository;

import com.vehicle.entity.BikeBooked;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BikeBookRepo extends JpaRepository<BikeBooked,Integer> {
    List<BikeBooked> findByUserEmail(String email);
}
