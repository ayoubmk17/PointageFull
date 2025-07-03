package com.ram.pointage_app.repositories;

import com.ram.pointage_app.entities.Collaborator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaboratorRepo extends JpaRepository<Collaborator, Long> {
}
