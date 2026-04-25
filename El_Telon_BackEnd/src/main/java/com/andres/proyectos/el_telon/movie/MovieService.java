package com.andres.proyectos.el_telon.movie;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<Movie> listActiveMovies() {
        return movieRepository.findByActivo(true);
    }
}
