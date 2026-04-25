package com.andres.proyectos.el_telon.movie;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/public")
    public ResponseEntity<List<Movie>> getPublicMovies() {
        return ResponseEntity.ok(movieService.listActiveMovies());
    }

}
