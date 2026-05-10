package com.andres.proyectos.el_telon.seat;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PurchaseRequest {
    private List<Long> seatIds;
}
