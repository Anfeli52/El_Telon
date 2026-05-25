package com.andres.proyectos.el_telon.function.dto;

import java.util.List;
import java.util.Map;

import com.andres.proyectos.el_telon.movie.dto.MovieDateOptionResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MovieShowtimeResponse {
    private List<MovieDateOptionResponse> dates;
    private Map<String, List<MovieShowtimeGroupResponse>> schedules;
}
