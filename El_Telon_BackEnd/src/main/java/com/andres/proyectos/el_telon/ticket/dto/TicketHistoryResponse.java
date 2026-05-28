package com.andres.proyectos.el_telon.ticket.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class TicketHistoryResponse {
    private Long ticketId;
    private Long functionId;
    private Long movieId;
    private String movieName;
    private String moviePoster;
    private String classification;
    private String format;
    private String cinema;
    private String room;
    private String functionDate;
    private String functionTime;
    private String seatLabel;
    private String seatType;
    private String purchaseDate;
    private BigDecimal price;
}