package com.vehicle.service;

import com.vehicle.payloads.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface BikeServices {
    //bike part
    boolean createBike(BikeDto dto, MultipartFile img) throws IOException;
    List<BikeDto> getAllBike();
    List<BikeDto> getBikeByBrand(String brand);
    boolean updateBike(BikeDto dto);
    boolean deleteBikeById(Integer id);
    //booked bike part
    boolean bikeBook(BikeBookedDto dto);
    List<BikeBookedDto> getBookedBike(String email);
    boolean updateBookedBike(UpdateBookedBike update);
    boolean deleteBookedBike(Integer id);
    List<BikeBookedDto> getAllBookedBike();
}
