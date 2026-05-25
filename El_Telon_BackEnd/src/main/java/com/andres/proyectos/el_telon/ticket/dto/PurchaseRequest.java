package com.andres.proyectos.el_telon.ticket.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseRequest {
    private List<Long> seatIds;
    private String reservationToken;
}
