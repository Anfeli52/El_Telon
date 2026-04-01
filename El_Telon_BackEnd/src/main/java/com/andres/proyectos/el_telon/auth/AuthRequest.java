package com.andres.proyectos.el_telon.auth;

import lombok.Data;

@Data
public class AuthRequest {
    private String correo;
    private String password;
}
