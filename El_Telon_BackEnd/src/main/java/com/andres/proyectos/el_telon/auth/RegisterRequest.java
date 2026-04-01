package com.andres.proyectos.el_telon.auth;

import com.andres.proyectos.el_telon.user.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String nombre;
    private String correo;
    private String password;
    private Role role;
}
