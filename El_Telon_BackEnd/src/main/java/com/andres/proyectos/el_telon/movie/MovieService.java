package com.andres.proyectos.el_telon.movie;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<MovieResponse> getAvailableMovies() {
        return movieRepository.findTop10ByActivoTrueOrderByFechaEstrenoDesc()
                .stream()
                .map(movie -> MovieResponse.builder()
                        .id(movie.getId())
                        .nombre(movie.getNombre())
                        .descripcion(movie.getDescripcion())
                        .imagen(movie.getImagen())
                        .categoria(movie.getCategoria())
                        .fechaEstreno(movie.getFechaEstreno())
                        .duracion(movie.getDuracion())
                        .build())
                .toList();
    }
}
