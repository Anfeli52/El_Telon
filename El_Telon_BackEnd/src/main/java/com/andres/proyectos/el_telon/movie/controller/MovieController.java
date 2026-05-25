package com.andres.proyectos.el_telon.movie.controller;

import java.util.List;

import com.andres.proyectos.el_telon.function.dto.MovieShowtimeResponse;
import com.andres.proyectos.el_telon.movie.dto.MovieDetailResponse;
import com.andres.proyectos.el_telon.movie.dto.MovieResponse;
import com.andres.proyectos.el_telon.movie.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/available")
    public ResponseEntity<List<MovieResponse>> getAvailableMovies() {
        return ResponseEntity.ok(movieService.getAvailableMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDetailResponse> getMovieDetail(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieDetail(id));
    }

    @GetMapping("/{id}/showtimes")
    public ResponseEntity<MovieShowtimeResponse> getMovieShowtimes(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieShowtimes(id));
    }
}
