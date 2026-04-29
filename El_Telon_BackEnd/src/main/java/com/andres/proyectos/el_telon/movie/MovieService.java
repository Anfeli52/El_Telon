package com.andres.proyectos.el_telon.movie;

import java.util.List;
import java.util.Map;

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
    

    public MovieDetailResponse getMovieDetail(Long movieId) {
        Movie movie = movieRepository.findByIdAndActivoTrue(movieId)
                .orElseThrow(() -> new RuntimeException("Pelicula no encontrada"));

        return MovieDetailResponse.builder()
                .id(movie.getId())
                .nombre(movie.getNombre())
                .descripcion(movie.getDescripcion())
                .imagen(movie.getImagen())
                .categoria(movie.getCategoria())
                .fechaEstreno(String.valueOf(movie.getFechaEstreno()))
                .duracion(movie.getDuracion())
                .tituloOriginal(movie.getNombre())
                .clasificacion("12+")
                .director("Director pendiente")
                .reparto("Reparto pendiente")
                .poster(movie.getImagen())
                .build();
    }

    public MovieShowtimeResponse getMovieShowtimes(Long movieId) {
        movieRepository.findByIdAndActivoTrue(movieId)
                .orElseThrow(() -> new RuntimeException("Pelicula no encontrada"));

        List<MovieDateOptionResponse> dates = List.of(
                MovieDateOptionResponse.builder()
                        .id("2026-04-28")
                        .weekDay("MAR")
                        .dayLabel("28 abr")
                        .build(),
                MovieDateOptionResponse.builder()
                        .id("2026-04-29")
                        .weekDay("MIE")
                        .dayLabel("29 abr")
                        .build()
        );

        Map<String, List<MovieShowtimeGroupResponse>> schedules = Map.of(
                "2026-04-28", List.of(
                        MovieShowtimeGroupResponse.builder()
                                .theater("Multicine Simon Bolivar")
                                .format("2D")
                                .language("ESP")
                                .times(List.of("03:20 p. m.", "07:10 p. m."))
                                .build()
                ),
                "2026-04-29", List.of(
                        MovieShowtimeGroupResponse.builder()
                                .theater("Multicine Centro")
                                .format("2D")
                                .language("SUB")
                                .times(List.of("04:40 p. m.", "08:30 p. m."))
                                .build()
                )
        );

        return MovieShowtimeResponse.builder()
                .dates(dates)
                .schedules(schedules)
                .build();
    }
}
