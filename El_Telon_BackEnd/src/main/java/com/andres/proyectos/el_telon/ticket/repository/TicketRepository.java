package com.andres.proyectos.el_telon.ticket.repository;

import com.andres.proyectos.el_telon.ticket.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByFuncionId(Long functionId);
    Optional<Ticket> findByFuncionIdAndAsientoId(Long functionId, Long seatId);

    @Query("SELECT t FROM Ticket t JOIN FETCH t.usuario JOIN FETCH t.funcion f JOIN FETCH f.pelicula")
    List<Ticket> findAllWithUsuarioAndPelicula();

    @Query("""
            SELECT t FROM Ticket t JOIN FETCH t.usuario u JOIN FETCH t.funcion f JOIN FETCH f.pelicula p JOIN FETCH f.sala s JOIN FETCH t.asiento a
            WHERE u.correo = :correo
            ORDER BY t.fechaCompra DESC, t.id DESC
            """)
    List<Ticket> findByUsuarioCorreoOrderByFechaCompraDesc(@Param("correo") String correo);
}
