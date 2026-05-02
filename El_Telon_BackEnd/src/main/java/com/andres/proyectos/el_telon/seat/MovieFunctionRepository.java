package com.andres.proyectos.el_telon.seat;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieFunctionRepository extends JpaRepository<MovieFunction, Long> {

    @EntityGraph(attributePaths = {"pelicula", "sala"})
    List<MovieFunction> findByPeliculaIdOrderByFechaProyeccionAscHoraInicioAsc(Long movieId);

    @EntityGraph(attributePaths = {"pelicula", "sala"})
    Optional<MovieFunction> findById(Long id);
}
