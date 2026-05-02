package com.andres.proyectos.el_telon.movie;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MovieShowtimeGroupResponse {
    private String theater;
    private String format;
    private String language;
    private List<MovieShowtimeTimeResponse> times;
}
