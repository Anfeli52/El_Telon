package com.andres.proyectos.el_telon.seat;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "asientos")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fila;

    @Column(nullable = false)
    private int numero;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "tipo_asiento")
    private SeatType tipoAsiento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sala", nullable = false)
    private TheaterRoom sala;
}
