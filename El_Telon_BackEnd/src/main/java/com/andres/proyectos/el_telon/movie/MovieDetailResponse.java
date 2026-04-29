package com.andres.proyectos.el_telon.movie;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MovieDetailResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private String categoria;
    private String fechaEstreno;
    private int duracion;
    private String tituloOriginal;
    private String clasificacion;
    private String director;
    private String reparto;
    private String poster;
}
