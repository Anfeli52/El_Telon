package com.andres.proyectos.el_telon.seat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findBySalaIdOrderByFilaAscNumeroDesc(Long salaId);
}
