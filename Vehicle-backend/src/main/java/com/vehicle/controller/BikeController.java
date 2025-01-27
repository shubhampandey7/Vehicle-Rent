package com.vehicle.controller;

import com.vehicle.payloads.BikeBookedDto;
import com.vehicle.payloads.BikeDto;
import com.vehicle.payloads.UpdateBookedBike;
import com.vehicle.serviceImpl.BikeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/vehicle/bike")
public class BikeController {
    @Autowired
    private BikeServiceImpl bikeServiceImpl;

    //bike creation
    @PreAuthorize("hasAuthority('Admin')")
    @PostMapping("/create")
    ResponseEntity<?> createBike(@RequestPart BikeDto dto, @RequestPart MultipartFile image) throws IOException {

        boolean msg= this.bikeServiceImpl.createBike(dto,image);
        return ResponseEntity.ok(msg);
    }

    @GetMapping("/")
    ResponseEntity<?> getAllBike(){
        List<BikeDto> ls=this.bikeServiceImpl.getAllBike();
        return ResponseEntity.ok(ls);
    }

    @GetMapping("/{brand}")
    ResponseEntity<?>getBikeByBrand(@PathVariable String brand){
        List<BikeDto> ls=this.bikeServiceImpl.getBikeByBrand(brand);
        return ResponseEntity.ok(ls);
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deleteById(@PathVariable Integer id){

        boolean msg=this.bikeServiceImpl.deleteBikeById(id);
        return ResponseEntity.ok(msg);
    }

    @PutMapping("/update")
    ResponseEntity<?> updateBike(@RequestBody BikeDto dto){

        boolean msg=this.bikeServiceImpl.updateBike(dto);
        return ResponseEntity.ok(msg);
    }

    //booking part
    @PostMapping("/book")
    @PreAuthorize("hasAnyAuthority('User','Admin')")
    public ResponseEntity<?> bikeBook(@RequestBody BikeBookedDto dto){
        boolean msg=this.bikeServiceImpl.bikeBook(dto);
        return ResponseEntity.ok().body(msg);
    }

    @GetMapping("/booked")
    @PreAuthorize("hasAnyAuthority('Admin')")
    public ResponseEntity<?> getAllBookedBikes(){
        List<BikeBookedDto> ls=this.bikeServiceImpl.getAllBookedBike();
        return ResponseEntity.ok(ls);
    }

    @GetMapping("/booked/{email}")
    @PreAuthorize("hasAnyAuthority('User','Admin')")
    ResponseEntity<?> getBookedBike(@PathVariable String email){
        List<BikeBookedDto> lb=this.bikeServiceImpl.getBookedBike(email);
        return ResponseEntity.ok().body(lb);

    }
    @PostMapping("/booked/update/")
    @PreAuthorize("hasAnyAuthority('User','Admin')")
    ResponseEntity<?> updateBookedBike(@RequestBody UpdateBookedBike update){

        boolean msg=this.bikeServiceImpl.updateBookedBike(update);
        return ResponseEntity.ok(msg);
    }

    @DeleteMapping("/booked/delete/{id}")
    @PreAuthorize("hasAnyAuthority('User','Admin')")
    ResponseEntity<?> deleteBookedBike(@PathVariable Integer id){

        if(id==null)
            return ResponseEntity.ok(false);

        boolean msg=this.bikeServiceImpl.deleteBookedBike(id);
        return ResponseEntity.ok(msg);
    }

}
