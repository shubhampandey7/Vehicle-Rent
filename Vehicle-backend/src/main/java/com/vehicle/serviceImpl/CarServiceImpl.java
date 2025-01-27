package com.vehicle.serviceImpl;


import com.vehicle.entity.Car;
import com.vehicle.entity.CarBooked;
import com.vehicle.payloads.CarBookedDto;
import com.vehicle.payloads.CarDto;
import com.vehicle.repository.CarBookRepo;
import com.vehicle.repository.CarRepo;
import com.vehicle.payloads.UpdateBookedCar;
import com.vehicle.service.CarServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class CarServiceImpl implements CarServices {


    @Autowired
    private CarBookRepo carBookRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CarRepo carRepo;

    private Car dtoToCar(CarDto dto){

        return this.modelMapper.map(dto, Car.class);
    }
    private CarDto carToDto(Car car){

        return this.modelMapper.map(car, CarDto.class);
    }

    @Override
    public boolean createCar(CarDto dto, MultipartFile img) throws IOException {



        Car car=this.dtoToCar(dto);
        if(img.isEmpty())
            throw new IOException("Image not found!!");
        car.setImageName(img.getOriginalFilename());
        car.setImageType(img.getContentType());
        car.setImage(img.getBytes());


        this.carRepo.save(car);
        return true;
    }

    @Override
    public List<CarDto> getAllCar() {
        List<Car> cl=this.carRepo.findAll();
        return cl.stream().map(this::carToDto).collect(Collectors.toList());

    }

    @Override
    public List<CarDto> getCarBrand(String brand) {
        List<Car> cl=this.carRepo.findByBrand(brand);
        return cl.stream().map(this::carToDto).collect(Collectors.toList());

    }

    @Override
    public void deleteCar(long id) {
        this.carRepo.deleteById(id);
    }

    @Override
    public void updateCar(CarDto dto) {

        Car car=this.carRepo.getReferenceById(Long.valueOf(dto.getId()));
        Car cr=this.modelMapper.map(dto, Car.class);
        cr.setImage(car.getImage());
        cr.setImageName(car.getImageName());
        cr.setImageType(car.getImageType());
        this.carRepo.save(cr);

    }




    @Override
    public boolean carBook(CarBookedDto dto) {

       Car car=this.carRepo.findById(dto.getCarId());

        CarBooked book=this.modelMapper.map(dto,CarBooked.class);
           book.setTotalPrice(dto.getDays()*dto.getTotalQuantity()*car.getPrice());
           car.setQuantity(car.getQuantity()-dto.getTotalQuantity());
           book.setCarBrand(car.getBrand());
           book.setCarName(car.getName());
           book.setRate(car.getPrice());
           this.carRepo.save(car);
           this.carBookRepo.save(book);
           return true;

    }

    @Override
    public List<CarBookedDto> getBookedCar(String email) {
        List<CarBooked> ls=this.carBookRepo.findByUserEmail(email);
        return ls.stream().map((bk)->modelMapper.map(bk, CarBookedDto.class)).collect(Collectors.toList());

    }

    @Override
    public boolean  updateBookedCar(UpdateBookedCar update) {

        Car car=this.carRepo.findById(update.getCarId());
        CarBooked bookedCar=this.carBookRepo.findByIdAndCarId(update.getId(),update.getCarId());

        if(update.getQuantity()<= car.getQuantity()+bookedCar.getTotalQuantity()){
            car.setQuantity(car.getQuantity()+bookedCar.getTotalQuantity()-update.getQuantity());
            this.carRepo.save(car);
            bookedCar.setTotalQuantity(update.getQuantity());
            bookedCar.setDays(update.getDays());
            bookedCar.setTotalPrice(update.getDays()* update.getQuantity()*car.getPrice());
            this.carBookRepo.save(bookedCar);
            return true;
        }
        return false;

    }

    @Override
    public boolean deleteBookedCar(Integer id) {
        CarBooked bc=this.carBookRepo.getReferenceById(id);
        Car car=this.carRepo.getReferenceById(Long.valueOf(bc.getCarId()));
        car.setQuantity(car.getQuantity()+bc.getTotalQuantity());
        this.carRepo.save(car);
        this.carBookRepo.deleteById(id);
        return true;
    }

    @Override
    public List<CarBookedDto> getAllBookedCar() {
        List<CarBooked> ls=this.carBookRepo.findAll();
        return ls.stream().map((bk)->modelMapper.map(bk, CarBookedDto.class)).collect(Collectors.toList());

    }


}
