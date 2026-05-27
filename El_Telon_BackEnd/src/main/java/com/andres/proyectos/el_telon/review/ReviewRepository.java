package com.andres.proyectos.el_telon.review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPeliculaIdAndPadreIsNullOrderByFechaCreacionDesc(Long movieId);
}
