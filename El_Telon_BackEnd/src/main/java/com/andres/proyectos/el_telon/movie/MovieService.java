package com.andres.proyectos.el_telon.movie;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.andres.proyectos.el_telon.seat.MovieFunction;
import com.andres.proyectos.el_telon.seat.MovieFunctionRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieFunctionRepository movieFunctionRepository;

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
                .categoria(String.valueOf(movie.getCategoria()))
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

        List<MovieFunction> functions = movieFunctionRepository.findByPeliculaIdOrderByFechaProyeccionAscHoraInicioAsc(movieId);

        List<MovieDateOptionResponse> dates = functions.stream()
                .map(MovieFunction::getFechaProyeccion)
                .distinct()
                .map(this::buildDateOption)
                .toList();

        Map<String, List<MovieShowtimeGroupResponse>> schedules = functions.stream()
                .collect(Collectors.groupingBy(
                        function -> function.getFechaProyeccion().toString(),
                        Collectors.collectingAndThen(Collectors.toList(), this::buildGroups)
                ));

        return MovieShowtimeResponse.builder()
                .dates(dates)
                .schedules(schedules)
                .build();
    }

    private MovieDateOptionResponse buildDateOption(LocalDate date) {
        String weekDay = date.getDayOfWeek()
                .getDisplayName(TextStyle.SHORT, new Locale("es", "CO"))
                .replace(".", "")
                .toLowerCase();

        String month = date.getMonth()
                .getDisplayName(TextStyle.SHORT, new Locale("es", "CO"))
                .replace(".", "")
                .toLowerCase();

        return MovieDateOptionResponse.builder()
                .id(date.toString())
                .weekDay(weekDay)
                .dayLabel(date.getDayOfMonth() + " " + month)
                .build();
    }

    private List<MovieShowtimeGroupResponse> buildGroups(List<MovieFunction> functions) {
        return functions.stream()
                .collect(Collectors.groupingBy(function -> "multiplex"))
                .entrySet()
                .stream()
                .map(entry -> MovieShowtimeGroupResponse.builder()
                        .theater(entry.getKey())
                        .format("2d")
                        .language("dob")
                        .times(entry.getValue().stream()
                                .map(function -> MovieShowtimeTimeResponse.builder()
                                        .id(function.getId())
                                        .time(function.getHoraInicio().format(DateTimeFormatter.ofPattern("h:mm a", Locale.US)).toLowerCase())
                                        .room(function.getSala().getNombre())
                                        .build())
                                .toList())
                        .build())
                .toList();
    }
}
