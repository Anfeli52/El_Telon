package com.andres.proyectos.el_telon.review;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReviewResponse {
    private Long id;
    private String autor;
    private String comentario;
    private int calificacion;
    private String fechaCreacion;
    private int likes;
    private int dislikes;
    private List<ReviewResponse> respuestas;
}
