package com.andres.proyectos.el_telon.seat;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "salas")
public class TheaterRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, name = "capacidad_total")
    private int capacidadTotal;

    @Column(name = "tipo_sala")
    private String tipoSala;
}
