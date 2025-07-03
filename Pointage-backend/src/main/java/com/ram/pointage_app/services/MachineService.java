package com.ram.pointage_app.services;

import com.ram.pointage_app.entities.Machine;
import com.ram.pointage_app.repositories.MachineRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MachineService {
    private final MachineRepo machineRepo;
    public MachineService(MachineRepo machineRepo) {this.machineRepo = machineRepo;}

    public List<Machine> getMachines() {return machineRepo.findAll();}

    public Optional<Machine> getMachine(Long id) {return machineRepo.findById(id);}

    public Machine createMachine(Machine machine) {return machineRepo.save(machine);}

    public String deleteMachine(Long id) {
        if (machineRepo.existsById(id)) {
            machineRepo.deleteById(id);
            return "Machine deleted";
        }
        return "Machine not found";
    }

}
