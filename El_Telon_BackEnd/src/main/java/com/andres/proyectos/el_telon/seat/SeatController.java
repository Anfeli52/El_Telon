package com.andres.proyectos.el_telon.seat;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andres.proyectos.el_telon.user.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {

    private final SeatService seatService;

    @GetMapping("/functions/{functionId}")
    public ResponseEntity<FunctionSeatResponse> getSeatsByFunction(
            @PathVariable Long functionId,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(seatService.getSeatsByFunction(functionId, user));
    }

    @PostMapping("/functions/{functionId}/reserve")
    public ResponseEntity<SeatReservationResponse> reserveSeats(
            @PathVariable Long functionId,
            @RequestBody PurchaseRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(seatService.reserveSeats(functionId, request, user));
    }

    @DeleteMapping("/functions/{functionId}/reserve/{reservationToken}")
    public ResponseEntity<Void> releaseReservation(
            @PathVariable Long functionId,
            @PathVariable String reservationToken,
            @AuthenticationPrincipal User user
    ) {
        seatService.releaseReservation(functionId, reservationToken, user);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/functions/{functionId}/purchase")
    public ResponseEntity<PurchaseResponse> purchaseSeats(
            @PathVariable Long functionId,
            @RequestBody PurchaseRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(seatService.purchaseSeats(functionId, request, user));
    }
}
