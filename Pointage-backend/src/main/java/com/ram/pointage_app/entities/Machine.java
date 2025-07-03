package com.ram.pointage_app.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table

public class Machine {
    @Id
    public Long id;
    public String MacAdress;
    public String OrdName;

    @OneToOne
    public Collaborator Collaborator;



}
