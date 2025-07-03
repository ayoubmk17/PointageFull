package com.ram.pointage_app.controllers;

import com.ram.pointage_app.entities.Shift;
import com.ram.pointage_app.services.ShiftService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/shift")
public class ShiftController {
    private ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    @GetMapping
    public ResponseEntity<List<Shift>> getShifts() {
        return ResponseEntity.ok(shiftService.getShifts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shift> getShift(@PathVariable Long id) {
        return ResponseEntity.ok(shiftService.getShift(id));
    }

    @PostMapping
    public ResponseEntity<Shift> createShift(@RequestBody Shift shift) {
        return ResponseEntity.ok(shiftService.createShift(shift));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShift(@PathVariable Long id) {
        return ResponseEntity.ok(shiftService.deleteShift(id));
    }
}
