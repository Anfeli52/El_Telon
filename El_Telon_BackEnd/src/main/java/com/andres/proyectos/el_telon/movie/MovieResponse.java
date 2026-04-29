package com.andres.proyectos.el_telon.movie;

import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

@Getter
@Builder
public class MovieResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private Category categoria;
    private Date fechaEstreno;
    private int duracion;
}
