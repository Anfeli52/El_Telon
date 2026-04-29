package com.andres.proyectos.el_telon.movie;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    static List<Movie> findTop10ByActivoTrueOrderByFechaEstrenoDesc() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findTop10ByActivoTrueOrderByFechaEstrenoDesc'");
    }
    Optional<Movie> findByIdAndActivoTrue(Long id);
}
