package com.andres.proyectos.el_telon.function.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MovieShowtimeTimeResponse {
    private Long id;
    private String time;
    private String room;
}
