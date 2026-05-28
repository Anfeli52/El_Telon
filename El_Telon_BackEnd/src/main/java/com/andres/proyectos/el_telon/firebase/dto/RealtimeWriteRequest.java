package com.andres.proyectos.el_telon.firebase.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RealtimeWriteRequest {

    @NotNull(message = "El campo value es obligatorio")
    private Object value;
}
