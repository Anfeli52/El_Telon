package com.andres.proyectos.el_telon.seat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findBySalaIdOrderByFilaAscNumeroDesc(Long salaId);
}
