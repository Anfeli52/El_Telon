package com.andres.proyectos.el_telon.movie;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MovieDateOptionResponse {
    private String id;
    private String weekDay;
    private String dayLabel;
}
