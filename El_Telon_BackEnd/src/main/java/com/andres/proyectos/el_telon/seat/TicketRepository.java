package com.andres.proyectos.el_telon.seat;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByFuncionId(Long functionId);
    Optional<Ticket> findByFuncionIdAndAsientoId(Long functionId, Long seatId);
}
