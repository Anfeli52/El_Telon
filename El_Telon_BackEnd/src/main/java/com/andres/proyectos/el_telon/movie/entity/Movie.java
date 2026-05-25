package com.andres.proyectos.el_telon.movie.entity;

import java.sql.Date;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "peliculas")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Getter
    @Setter
    @Column(nullable = false)
    private String nombre;

    @Getter
    @Setter
    @Column(nullable = false)
    private String descripcion;

    @Getter
    @Setter
    @Column(unique = true, name = "imagen_url", nullable = false)
    private String imagen;

    @Getter
    @Setter
    @Column(name = "fecha_estreno", nullable = false)
    private Date fechaEstreno;

    @Getter
    @Setter
    @Column(nullable = false)
    private int duracion;

    @Getter
    @Setter
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category categoria;

    @Getter
    @Setter
    @Column(nullable = false)
    private boolean activo;
}
