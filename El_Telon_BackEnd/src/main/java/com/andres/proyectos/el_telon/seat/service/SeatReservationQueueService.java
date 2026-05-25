package com.andres.proyectos.el_telon.seat.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;

import com.andres.proyectos.el_telon.seat.dto.SeatReservationResponse;
import com.andres.proyectos.el_telon.ticket.dto.PurchaseRequest;
import com.andres.proyectos.el_telon.ticket.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.andres.proyectos.el_telon.user.User;

@Service
public class SeatReservationQueueService {

    private static final long RESERVATION_MINUTES = 5;

    private final Map<String, ReservationEntry> reservationsByToken = new ConcurrentHashMap<>();

    public synchronized SeatReservationResponse reserveSeats(
            Long functionId,
            List<Long> seatIds,
            User user,
            TicketRepository ticketRepository
    ) {
        cleanupExpired();

        if (seatIds == null || seatIds.isEmpty()) {
            throw new ResponseStatusException(BAD_REQUEST, "Debe seleccionar al menos una silla");
        }

        Set<Long> uniqueSeatIds = new LinkedHashSet<>(seatIds);

        for (Long seatId : uniqueSeatIds) {
            ticketRepository.findByFuncionIdAndAsientoId(functionId, seatId)
                    .ifPresent(ticket -> {
                        throw new ResponseStatusException(CONFLICT, "Una de las sillas ya esta ocupada");
                    });

            ReservationEntry existing = findActiveReservation(functionId, seatId);
            if (existing != null && !existing.userId().equals(user.getId())) {
                throw new ResponseStatusException(CONFLICT, "Una de las sillas ya fue reservada temporalmente");
            }
        }

        releaseReservationsOwnedByUser(functionId, user.getId());

        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(RESERVATION_MINUTES);
        String token = UUID.randomUUID().toString();

        ReservationEntry entry = new ReservationEntry(
                token,
                functionId,
                user.getId(),
                new ArrayList<>(uniqueSeatIds),
                expiresAt
        );

        reservationsByToken.put(token, entry);

        return SeatReservationResponse.builder()
                .reservationToken(token)
                .expiresAt(expiresAt)
                .seatIds(new ArrayList<>(uniqueSeatIds))
                .build();
    }

    public synchronized void releaseReservation(Long functionId, String reservationToken, User user) {
        cleanupExpired();

        ReservationEntry entry = reservationsByToken.get(reservationToken);
        if (entry == null) {
            return;
        }

        if (!entry.functionId().equals(functionId)) {
            return;
        }

        if (!entry.userId().equals(user.getId())) {
            throw new ResponseStatusException(FORBIDDEN, "No puedes liberar una reserva de otro usuario");
        }

        reservationsByToken.remove(reservationToken);
    }

    public synchronized Set<Long> getReservedSeatIdsForOtherUsers(Long functionId, Long userId) {
        cleanupExpired();

        return reservationsByToken.values().stream()
                .filter(entry -> entry.functionId().equals(functionId))
                .filter(entry -> !entry.userId().equals(userId))
                .flatMap(entry -> entry.seatIds().stream())
                .collect(Collectors.toSet());
    }

    public synchronized void validateAndConsumeReservation(
            Long functionId,
            PurchaseRequest request,
            User user
    ) {
        cleanupExpired();

        if (request.getReservationToken() == null || request.getReservationToken().isBlank()) {
            throw new ResponseStatusException(BAD_REQUEST, "La compra requiere una reserva temporal activa");
        }

        ReservationEntry entry = reservationsByToken.get(request.getReservationToken());

        if (entry == null || !entry.functionId().equals(functionId)) {
            throw new ResponseStatusException(CONFLICT, "La reserva temporal ya expiro o no existe");
        }

        if (!entry.userId().equals(user.getId())) {
            throw new ResponseStatusException(FORBIDDEN, "La reserva temporal no pertenece al usuario actual");
        }

        Set<Long> requested = new HashSet<>(request.getSeatIds());
        Set<Long> reserved = new HashSet<>(entry.seatIds());

        if (!requested.equals(reserved)) {
            throw new ResponseStatusException(CONFLICT, "Las sillas a comprar no coinciden con la reserva temporal");
        }

        reservationsByToken.remove(request.getReservationToken());
    }

    private void cleanupExpired() {
        LocalDateTime now = LocalDateTime.now();
        reservationsByToken.entrySet().removeIf(entry -> entry.getValue().expiresAt().isBefore(now));
    }

    private ReservationEntry findActiveReservation(Long functionId, Long seatId) {
        return reservationsByToken.values().stream()
                .filter(entry -> entry.functionId().equals(functionId))
                .filter(entry -> entry.seatIds().contains(seatId))
                .findFirst()
                .orElse(null);
    }

    private void releaseReservationsOwnedByUser(Long functionId, Long userId) {
        reservationsByToken.entrySet().removeIf(entry ->
                entry.getValue().functionId().equals(functionId)
                        && entry.getValue().userId().equals(userId)
        );
    }

    private record ReservationEntry(
            String token,
            Long functionId,
            Long userId,
            List<Long> seatIds,
            LocalDateTime expiresAt
    ) {
    }
}
