package com.andres.proyectos.el_telon.movie;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
}
