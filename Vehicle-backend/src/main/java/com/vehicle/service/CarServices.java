package com.vehicle.service;

import com.vehicle.payloads.CarBookedDto;
import com.vehicle.payloads.CarDto;

import com.vehicle.payloads.UpdateBookedCar;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



import java.io.IOException;

import java.util.List;


@Service
public interface CarServices  {
    boolean createCar(CarDto dto, MultipartFile img) throws IOException;
    List<CarDto> getAllCar();
    List<CarDto> getCarBrand(String brand);
    void deleteCar(long id);
    void updateCar(CarDto dto);
    boolean carBook(CarBookedDto dto);
    List<CarBookedDto> getBookedCar(String email);
    boolean updateBookedCar(UpdateBookedCar update);
    boolean deleteBookedCar(Integer id);
    List<CarBookedDto> getAllBookedCar();



}
