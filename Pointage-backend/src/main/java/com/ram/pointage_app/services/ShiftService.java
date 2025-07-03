package com.ram.pointage_app.services;

import com.ram.pointage_app.entities.Shift;
import com.ram.pointage_app.repositories.ShiftRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShiftService {
    private final ShiftRepo shiftRepo;
    public ShiftService(ShiftRepo shiftRepo) {this.shiftRepo = shiftRepo;}

    public List<Shift> getShifts() {return shiftRepo.findAll();}

    public Shift getShift(Long id) {return shiftRepo.findById(id).get();}

    public Shift createShift(Shift shift) {
        return shiftRepo.save(shift);
    }

    public String deleteShift(Long id) {
        if (shiftRepo.existsById(id)) {
            shiftRepo.deleteById(id);
            return "Shift deleted";
        }
        return "Shift not found";
    }
}
