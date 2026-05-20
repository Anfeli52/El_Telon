package com.andres.proyectos.el_telon.movie;

import java.util.List;

import com.andres.proyectos.el_telon.recomendation.RecomendationService;
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
    private final RecomendationService recomendationService;

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

    @GetMapping("/recomendaciones/{userId}")
    public ResponseEntity<List<Movie>> getRecomendaciones(@PathVariable String userId){
        return ResponseEntity.ok(recomendationService.recommendMovie(userId));
    }
}
