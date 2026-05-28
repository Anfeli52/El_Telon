package com.andres.proyectos.el_telon.ticket.controller;

import com.andres.proyectos.el_telon.ticket.dto.TicketHistoryResponse;
import com.andres.proyectos.el_telon.ticket.entity.Ticket;
import com.andres.proyectos.el_telon.ticket.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private static final Locale ES_LOCALE = new Locale("es", "CO");
    private static final DateTimeFormatter FUNCTION_DATE_FORMAT = DateTimeFormatter.ofPattern("d 'de' MMMM yyyy", ES_LOCALE);
    private static final DateTimeFormatter FUNCTION_TIME_FORMAT = DateTimeFormatter.ofPattern("h:mm a", ES_LOCALE);
    private static final DateTimeFormatter PURCHASE_DATE_FORMAT = DateTimeFormatter.ofPattern("d 'de' MMMM yyyy, h:mm a", ES_LOCALE);

    private final TicketRepository ticketRepository;

    @GetMapping("/me")
    public List<TicketHistoryResponse> getMyTickets(Authentication authentication) {
        String correo = authentication.getName();

        return ticketRepository.findByUsuarioCorreoOrderByFechaCompraDesc(correo)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private TicketHistoryResponse toResponse(Ticket ticket) {
        return TicketHistoryResponse.builder()
                .ticketId(ticket.getId())
                .functionId(ticket.getFuncion().getId())
                .movieId(ticket.getFuncion().getPelicula().getId())
                .movieName(ticket.getFuncion().getPelicula().getNombre())
                .moviePoster(ticket.getFuncion().getPelicula().getImagen())
                .classification(ticket.getFuncion().getPelicula().getCategoria().name().replace('_', ' '))
                .format("2D")
                .cinema("Multiplex")
                .room(ticket.getFuncion().getSala().getNombre())
                .functionDate(ticket.getFuncion().getFechaProyeccion().format(FUNCTION_DATE_FORMAT))
                .functionTime(ticket.getFuncion().getHoraInicio().format(FUNCTION_TIME_FORMAT).toLowerCase(ES_LOCALE))
                .seatLabel(ticket.getAsiento().getFila() + String.valueOf(ticket.getAsiento().getNumero()))
                .seatType(ticket.getAsiento().getTipoAsiento().name())
                .purchaseDate(ticket.getFechaCompra().format(PURCHASE_DATE_FORMAT).toLowerCase(ES_LOCALE))
                .price(ticket.getPrecioFinal())
                .build();
    }
}