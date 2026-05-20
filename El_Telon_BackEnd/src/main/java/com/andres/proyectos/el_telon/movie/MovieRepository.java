package com.andres.proyectos.el_telon.movie;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findTop10ByActivoTrueOrderByFechaEstrenoDesc();
    Optional<Movie> findByIdAndActivoTrue(Long id);
    List<Movie> findByActivoTrue();
}
