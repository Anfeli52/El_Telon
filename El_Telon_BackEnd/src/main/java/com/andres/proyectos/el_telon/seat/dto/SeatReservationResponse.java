package com.andres.proyectos.el_telon.seat.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SeatReservationResponse {
    private String reservationToken;
    private LocalDateTime expiresAt;
    private List<Long> seatIds;
}
