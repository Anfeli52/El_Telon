package com.andres.proyectos.el_telon.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {

    @NotBlank
    @Size(max = 120)
    private String autor;

    @NotBlank
    @Size(max = 600)
    private String comentario;

    @Min(1)
    @Max(5)
    private int calificacion;
}
