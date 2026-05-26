package com.andres.proyectos.el_telon.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FirebaseAuthRequest {
    @NotBlank(message = "El token de Firebase es obligatorio")
    private String idToken;

    private String nombre;
}