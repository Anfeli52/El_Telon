package com.andres.proyectos.el_telon.seat;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SeatResponse {
    private Long id;
    private String row;
    private int number;
    private String type;
    private boolean available;
}
