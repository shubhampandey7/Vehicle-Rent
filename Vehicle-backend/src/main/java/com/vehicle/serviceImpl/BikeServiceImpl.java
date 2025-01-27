package com.vehicle.serviceImpl;

import com.vehicle.entity.Bike;
import com.vehicle.entity.BikeBooked;

import com.vehicle.payloads.BikeBookedDto;
import com.vehicle.payloads.BikeDto;

import com.vehicle.payloads.UpdateBookedBike;
import com.vehicle.repository.BikeBookRepo;
import com.vehicle.repository.BikeRepo;
import com.vehicle.service.BikeServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import java.util.stream.Collectors;

@Service
public class BikeServiceImpl implements BikeServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BikeRepo bikeRepo;

    @Autowired
    private BikeBookRepo bikeBookRepo;

    //bike part
    @Override
    public boolean createBike(BikeDto dto, MultipartFile img) throws IOException {
        if(img.isEmpty() && dto==null){

            return false;
        }


        Bike bike=this.modelMapper.map(dto, Bike.class);
        bike.setImageName(img.getOriginalFilename());
        bike.setImageType(img.getContentType());
        bike.setImage(img.getBytes());
        this.bikeRepo.save(bike);
        return true;
    }

    @Override
    public List<BikeDto> getAllBike() {
        List<Bike> ls=this.bikeRepo.findAll();
        return ls.stream().map((bk)->modelMapper.map(bk,BikeDto.class)).collect(Collectors.toList());

    }

    @Override
    public List<BikeDto> getBikeByBrand(String brand) {
        List<Bike> ls=this.bikeRepo.findByBrand(brand);
        return ls.stream().map((bk)->modelMapper.map(bk, BikeDto.class)).collect(Collectors.toList());
    }

    @Override
    public boolean updateBike(BikeDto dto) {
        Bike bk=this.bikeRepo.getReferenceById(dto.getId());
        Bike b=this.modelMapper.map(dto,Bike.class);

        b.setImage(bk.getImage());
        b.setImageType(bk.getImageType());
        b.setImageName(bk.getImageName());
        this.bikeRepo.save(b);
        return true;
    }

    @Override
    public boolean deleteBikeById(Integer id) {
        this.bikeRepo.deleteById(id);
        return true;
    }

    //bike booking part
    @Override
    public boolean bikeBook(BikeBookedDto dto) {
        Bike bk=this.bikeRepo.getReferenceById(dto.getBikeId());

            bk.setQuantity(bk.getQuantity()-dto.getTotalQuantity());
            dto.setRate(bk.getRate());
            dto.setTotalPrice(dto.getDays()*bk.getRate()*dto.getTotalQuantity());
            dto.setBikeName(bk.getName());
            dto.setBikeBrand(bk.getBrand());
            BikeBooked bike=this.modelMapper.map(dto, BikeBooked.class);
            this.bikeRepo.save(bk);
            this.bikeBookRepo.save(bike);
            return true;
    }

    @Override
    public List<BikeBookedDto> getBookedBike(String email) {
        List<BikeBooked> bl=this.bikeBookRepo.findByUserEmail(email);
        return bl.stream().map((bk)->modelMapper.map(bk, BikeBookedDto.class)).collect(Collectors.toList());
    }

    @Override
    public boolean updateBookedBike(UpdateBookedBike update) {
        Bike bk=this.bikeRepo.getReferenceById(update.getBikeId());
        BikeBooked bb=this.bikeBookRepo.getReferenceById(update.getId());
        if((bk.getQuantity()+bb.getTotalQuantity())>=update.getQuantity()){
            bk.setQuantity((bk.getQuantity()+bb.getTotalQuantity())-update.getQuantity());
            this.bikeRepo.save(bk);
            bb.setDays(update.getDays());
            bb.setTotalQuantity(update.getQuantity());
            bb.setTotalPrice(update.getDays()*bb.getRate()* update.getQuantity());
            this.bikeBookRepo.save(bb);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteBookedBike(Integer id) {
        BikeBooked bb=this.bikeBookRepo.getReferenceById(id);
        Bike bk=this.bikeRepo.getReferenceById(bb.getBikeId());
        bk.setQuantity(bk.getQuantity()+bb.getTotalQuantity());
        this.bikeRepo.save(bk);
        this.bikeBookRepo.deleteById(id);
        return true;
    }

    @Override
    public List<BikeBookedDto> getAllBookedBike() {
        List<BikeBooked> bl=this.bikeBookRepo.findAll();
        return bl.stream().map((bb)->modelMapper.map(bb, BikeBookedDto.class)).collect(Collectors.toList());
    }



}
