package com.andres.proyectos.el_telon.seat;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseRequest {
    private List<Long> seatIds;
}
