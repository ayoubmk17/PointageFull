package com.ram.pointage_app.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Data
@Table

public class Shift {

    @Id
    private Long id;

    private LocalDateTime dateEntree;
    private LocalDateTime dateSortie;
    private int duree;
    private Status status;
    private long idCollaborator;
    private long idMachine;

    @ManyToOne
    private Collaborator collaborator;

    @ManyToOne
    private Machine machine;
}
