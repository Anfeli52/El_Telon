package com.andres.proyectos.el_telon.function.repository;

import com.andres.proyectos.el_telon.function.entity.MovieFunction;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MovieFunctionRepository extends JpaRepository<MovieFunction, Long> {

    @EntityGraph(attributePaths = {"pelicula", "sala"})
    List<MovieFunction> findByPeliculaIdOrderByFechaProyeccionAscHoraInicioAsc(Long movieId);

    @EntityGraph(attributePaths = {"pelicula", "sala"})
    Optional<MovieFunction> findById(Long id);
}
