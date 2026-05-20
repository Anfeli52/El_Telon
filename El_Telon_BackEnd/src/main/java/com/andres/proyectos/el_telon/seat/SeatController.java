package com.andres.proyectos.el_telon.seat;

import com.andres.proyectos.el_telon.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {

    private final SeatService seatService;

    @GetMapping("/functions/{functionId}")
    public ResponseEntity<FunctionSeatResponse> getSeatsByFunction(@PathVariable Long functionId) {
        return ResponseEntity.ok(seatService.getSeatsByFunction(functionId));
    }

    @PostMapping("/functions/{functionId}/purchase")
    public ResponseEntity<PurchaseResponse> purchaseSeats(@PathVariable Long functionId, @RequestBody PurchaseRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(seatService.purchaseSeats(functionId, request, user));
    }
}
