package com.andres.proyectos.el_telon.movie;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String categoria;

    @Getter
    @Setter
    @Column(nullable = false)
    private boolean activo;
}
