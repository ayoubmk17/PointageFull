package com.ram.pointage_app.services;

import com.ram.pointage_app.entities.*;
import com.ram.pointage_app.repositories.*;
import lombok.*;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShiftService {
    private final ShiftRepo shiftRepo;
    private final CollaboratorRepo collaboratorRepo;
    private final MachineRepo machineRepo;

    public List<Shift> getShifts() {
        return shiftRepo.findAll();
    }

    public Shift getShift(Long id) {
        return shiftRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Shift not found"));
    }

    public Shift createShift(Shift shift) {
        // Verify and load existing collaborator
        if (shift.getCollaborator() != null && shift.getCollaborator().getId() != null) {
            Collaborator existingCollaborator = collaboratorRepo.findById(shift.getCollaborator().getId())
                    .orElseThrow(() -> new RuntimeException("Collaborator not found"));
            shift.setCollaborator(existingCollaborator);
        }

        // Verify and load existing machine
        if (shift.getMachine() != null && shift.getMachine().getId() != null) {
            Machine existingMachine = machineRepo.findById(shift.getMachine().getId())
                    .orElseThrow(() -> new RuntimeException("Machine not found"));
            shift.setMachine(existingMachine);
        }

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