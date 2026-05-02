package com.andres.proyectos.el_telon.seat;

import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.andres.proyectos.el_telon.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final MovieFunctionRepository movieFunctionRepository;
    private final SeatRepository seatRepository;
    private final TicketRepository ticketRepository;

    public FunctionSeatResponse getSeatsByFunction(Long functionId) {
        MovieFunction function = movieFunctionRepository.findById(functionId)
                .orElseThrow(() -> new RuntimeException("Funcion no encontrada"));

        Set<Long> occupiedSeats = ticketRepository.findByFuncionId(functionId)
                .stream()
                .map(ticket -> ticket.getAsiento().getId())
                .collect(Collectors.toSet());

        var seats = seatRepository.findBySalaIdOrderByFilaAscNumeroDesc(function.getSala().getId())
                .stream()
                .map(seat -> SeatResponse.builder()
                        .id(seat.getId())
                        .row(seat.getFila())
                        .number(seat.getNumero())
                        .type(seat.getTipoAsiento().name())
                        .available(!occupiedSeats.contains(seat.getId()))
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

    public PurchaseResponse purchaseSeats(Long functionId, PurchaseRequest request, User user) {
        MovieFunction function = movieFunctionRepository.findById(functionId)
                .orElseThrow(() -> new RuntimeException("Funcion no encontrada"));

        if (request.getSeatIds() == null || request.getSeatIds().isEmpty()) {
            throw new RuntimeException("Debe seleccionar al menos una silla");
        }

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
