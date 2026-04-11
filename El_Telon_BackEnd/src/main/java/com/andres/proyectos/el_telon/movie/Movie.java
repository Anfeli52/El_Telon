package com.andres.proyectos.el_telon.movie;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "peliculas")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    private String nombre;

    @Getter
    @Setter
    private String descripcion;

    @Getter
    @Setter
    @Column(unique = true, name = "imagen_url")
    private String imagen;

    @Getter
    @Setter
    @Column(name = "fecha_estreno")
    private Date fechaEstreno;

    @Getter
    @Setter
    private int duracion;
}
