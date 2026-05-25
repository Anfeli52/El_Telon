package com.andres.proyectos.el_telon.seat.service;

import com.andres.proyectos.el_telon.function.entity.MovieFunction;
import com.andres.proyectos.el_telon.function.repository.MovieFunctionRepository;
import com.andres.proyectos.el_telon.movie.entity.Movie;
import com.andres.proyectos.el_telon.recommendation.service.RecommendationService;
import com.andres.proyectos.el_telon.seat.dto.FunctionSeatResponse;
import com.andres.proyectos.el_telon.seat.dto.SeatResponse;
import com.andres.proyectos.el_telon.seat.entity.Seat;
import com.andres.proyectos.el_telon.seat.repository.SeatRepository;
import com.andres.proyectos.el_telon.ticket.dto.PurchaseRequest;
import com.andres.proyectos.el_telon.ticket.dto.PurchaseResponse;
import com.andres.proyectos.el_telon.ticket.entity.Ticket;
import com.andres.proyectos.el_telon.ticket.repository.TicketRepository;
import com.andres.proyectos.el_telon.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import com.andres.proyectos.el_telon.seat.dto.SeatReservationResponse;


@Service
@RequiredArgsConstructor
public class SeatService {

    private final RecommendationService recommendationService;
    private final MovieFunctionRepository movieFunctionRepository;
    private final SeatRepository seatRepository;
    private final TicketRepository ticketRepository;
    private final SeatReservationQueueService seatReservationQueueService;

    public FunctionSeatResponse getSeatsByFunction(Long functionId, User user) {
        MovieFunction function = movieFunctionRepository.findById(functionId)
                .orElseThrow(() -> new RuntimeException("Funcion no encontrada"));

        Set<Long> occupiedSeats = ticketRepository.findByFuncionId(functionId)
                .stream()
                .map(ticket -> ticket.getAsiento().getId())
                .collect(Collectors.toSet());

        Long userId = user != null ? user.getId() : -1L;
        Set<Long> reservedByOthers = seatReservationQueueService
                .getReservedSeatIdsForOtherUsers(functionId, userId);

        var seats = seatRepository.findBySalaIdOrderByFilaAscNumeroDesc(function.getSala().getId())
                .stream()
                .map(seat -> SeatResponse.builder()
                        .id(seat.getId())
                        .row(seat.getFila())
                        .number(seat.getNumero())
                        .type(seat.getTipoAsiento().name())
                        .available(!occupiedSeats.contains(seat.getId()) && !reservedByOthers.contains(seat.getId()))
                        .build())
                .toList();

        return FunctionSeatResponse.builder()
                .functionId(function.getId())
                .movieId(function.getPelicula().getId())
                .movieName(function.getPelicula().getNombre())
                .classification("recomendada para mayores de 12 anos")
                .format("2d")
                .cinema("multiplex")
                .room(function.getSala().getNombre())
                .dateLabel(buildDateLabel(function))
                .timeLabel(function.getHoraInicio().format(DateTimeFormatter.ofPattern("h:mm a", Locale.US)).toLowerCase())
                .duration(function.getPelicula().getDuracion())
                .poster(function.getPelicula().getImagen())
                .price(function.getPrecioBase())
                .seats(seats)
                .build();
    }

    public SeatReservationResponse reserveSeats(Long functionId, PurchaseRequest request, User user) {
        MovieFunction function = movieFunctionRepository.findById(functionId)
                .orElseThrow(() -> new RuntimeException("Funcion no encontrada"));

        request.getSeatIds().forEach(seatId -> {
            Seat seat = seatRepository.findById(seatId)
                    .orElseThrow(() -> new RuntimeException("Silla no encontrada"));

            if (!seat.getSala().getId().equals(function.getSala().getId())) {
                throw new RuntimeException("La silla no pertenece a esta sala");
            }
        });

        return seatReservationQueueService.reserveSeats(functionId, request.getSeatIds(), user, ticketRepository);
    }

    public void releaseReservation(Long functionId, String reservationToken, User user) {
        seatReservationQueueService.releaseReservation(functionId, reservationToken, user);
    }

    @Transactional
    public PurchaseResponse purchaseSeats(Long functionId, PurchaseRequest request, User user) {
        MovieFunction function = movieFunctionRepository.findById(functionId)
                .orElseThrow(() -> new RuntimeException("Funcion no encontrada"));

        if (request.getSeatIds() == null || request.getSeatIds().isEmpty()) {
            throw new RuntimeException("Debe seleccionar al menos una silla");
        }

        seatReservationQueueService.validateAndConsumeReservation(functionId, request, user);

        request.getSeatIds().forEach(seatId -> {
            Seat seat = seatRepository.findById(seatId)
                    .orElseThrow(() -> new RuntimeException("Silla no encontrada"));

            if (!seat.getSala().getId().equals(function.getSala().getId())) {
                throw new RuntimeException("La silla no pertenece a esta sala");
            }

            ticketRepository.findByFuncionIdAndAsientoId(functionId, seatId)
                    .ifPresent(ticket -> {
                        throw new RuntimeException("Una de las sillas ya esta ocupada");
                    });

            ticketRepository.save(Ticket.builder()
                    .usuario(user)
                    .funcion(function)
                    .asiento(seat)
                    .fechaCompra(LocalDateTime.now())
                    .precioFinal(function.getPrecioBase())
                    .build());
        });

        try {
            Movie movie = function.getPelicula();

            recommendationService.registerNewPurchase(
                    user.getUsername(),
                    user.getNombre(),
                    movie.getId(),
                    movie.getNombre()
            );

            System.out.println("[GRAFO] Conexión en caliente creada con éxito para: " + user.getUsername() + " -> " + movie.getNombre());
        } catch (Exception e) {
            System.err.println("[ERROR GRAFO] No se pudo actualizar el grafo en tiempo real: " + e.getMessage());
        }

        return PurchaseResponse.builder()
                .message("pago correctamente hecho")
                .build();
    }

    private String buildDateLabel(MovieFunction function) {
        String month = function.getFechaProyeccion()
                .getMonth()
                .getDisplayName(TextStyle.SHORT, new Locale("es", "CO"))
                .replace(".", "");

        return month + " " + function.getFechaProyeccion().getDayOfMonth();
    }
}
