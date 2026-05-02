package com.andres.proyectos.el_telon.seat;

import java.math.BigDecimal;
import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FunctionSeatResponse {
    private Long functionId;
    private Long movieId;
    private String movieName;
    private String classification;
    private String format;
    private String cinema;
    private String room;
    private String dateLabel;
    private String timeLabel;
    private int duration;
    private String poster;
    private BigDecimal price;
    private List<SeatResponse> seats;
}
