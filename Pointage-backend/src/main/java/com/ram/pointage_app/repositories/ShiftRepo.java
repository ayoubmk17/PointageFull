package com.ram.pointage_app.repositories;

import com.ram.pointage_app.entities.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftRepo extends JpaRepository<Shift, Long> {
}
