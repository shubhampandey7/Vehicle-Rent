package com.vehicle.controller;


import com.vehicle.payloads.CarBookedDto;
import com.vehicle.payloads.CarDto;
import com.vehicle.payloads.UpdateBookedCar;
import com.vehicle.serviceImpl.CarServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;



@RestController
@RequestMapping("/vehicle/car")
public class CarController {

    @Autowired
    private CarServiceImpl carServiceImpl;

    @PreAuthorize("hasAuthority('Admin')")
    @PostMapping("/create")
    public ResponseEntity<?> addCar(@RequestPart CarDto dto, @RequestPart MultipartFile image) throws IOException, MethodArgumentNotValidException {

        boolean msg=this.carServiceImpl.createCar(dto,image);
        return ResponseEntity.ok().body(msg);
    }

    @GetMapping("/")
    public ResponseEntity<List<CarDto>> allCar(){
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        List<CarDto> dl=this.carServiceImpl.getAllCar();
        return ResponseEntity.ok().body(dl);
    }

    @GetMapping("/{brand}")
    public ResponseEntity<List<CarDto>> getCarByBrand(@PathVariable String brand){
        List<CarDto> dl=this.carServiceImpl.getCarBrand(brand);
        
        return ResponseEntity.ok().body(dl);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> updateCar(@RequestBody CarDto dto){
        System.out.println("inside updating function!!");
        this.carServiceImpl.updateCar(dto);
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasAuthority('Admin')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable long id){
        this.carServiceImpl.deleteCar(id);
        return ResponseEntity.ok(true);

    }

    @PreAuthorize("hasAnyAuthority('User','Admin')")
    @PostMapping("/book/")
    public ResponseEntity<?> carBook(@RequestBody CarBookedDto dto){
        System.out.println("Car booking request!!");
        boolean msg=this.carServiceImpl.carBook(dto);
        System.out.println(msg);
        return ResponseEntity.ok().body(msg);
    }

    @PreAuthorize("hasAnyAuthority('Admin')")
    @GetMapping("/booked")
    public ResponseEntity<?> getAllBookedCars(){
        List<CarBookedDto> ls=this.carServiceImpl.getAllBookedCar();
        return ResponseEntity.ok(ls);
    }

    @PreAuthorize("hasAnyAuthority('User','Admin')")
    @GetMapping("/booked/{email}")
    ResponseEntity<?> getBookedCar(@PathVariable String email){
        List<CarBookedDto> lb=this.carServiceImpl.getBookedCar(email);
        return ResponseEntity.ok().body(lb);

    }

    @PreAuthorize("hasAnyAuthority('User','Admin')")
    @PostMapping("/booked/update/")
    ResponseEntity<?> updateBookedCar(@RequestBody UpdateBookedCar update){

        boolean msg=this.carServiceImpl.updateBookedCar(update);
        return ResponseEntity.ok(msg);
    }

    @DeleteMapping("/booked/delete/{id}")
    @PreAuthorize("hasAnyAuthority('Admin','User')")
    ResponseEntity<?> deleteBookedCar(@PathVariable Integer id){

        if(id==null)
            return ResponseEntity.ok(false);

        boolean msg=this.carServiceImpl.deleteBookedCar(id);
        return ResponseEntity.ok(msg);
    }

}
