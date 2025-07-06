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
        // Recherche du collaborateur par id ou par email
        Collaborator collaborator = null;
        if (shift.getCollaborator() != null) {
            if (shift.getCollaborator().getId() != null) {
                collaborator = collaboratorRepo.findById(shift.getCollaborator().getId())
                        .orElseThrow(() -> new RuntimeException("Collaborator not found"));
            } else if (shift.getCollaborator().getEmail() != null) {
                collaborator = collaboratorRepo.findByEmail(shift.getCollaborator().getEmail())
                        .orElseThrow(() -> new RuntimeException("Collaborator with email '" + shift.getCollaborator().getEmail() + "' not found"));
            }
        }
        if (collaborator == null) {
            throw new RuntimeException("Collaborator information is required");
        }
        shift.setCollaborator(collaborator);

        // Vérification et chargement de la machine existante
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