package com.andres.proyectos.el_telon.ticket.entity;

import com.andres.proyectos.el_telon.function.entity.MovieFunction;
import com.andres.proyectos.el_telon.seat.entity.Seat;
import com.andres.proyectos.el_telon.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ticketes")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private User usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_funcion", nullable = false)
    private MovieFunction funcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_asiento", nullable = false)
    private Seat asiento;

    @Column(name = "fecha_compra")
    private LocalDateTime fechaCompra;

    @Column(nullable = false, name = "precio_final")
    private BigDecimal precioFinal;
}
