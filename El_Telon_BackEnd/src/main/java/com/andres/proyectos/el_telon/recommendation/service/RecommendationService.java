package com.andres.proyectos.el_telon.recommendation.service;

import com.andres.proyectos.el_telon.movie.entity.Category;
import com.andres.proyectos.el_telon.function.entity.MovieFunction;
import com.andres.proyectos.el_telon.function.repository.MovieFunctionRepository;
import com.andres.proyectos.el_telon.movie.entity.Movie;
import com.andres.proyectos.el_telon.movie.repository.MovieRepository;
import com.andres.proyectos.el_telon.recommendation.structure.Edge;
import com.andres.proyectos.el_telon.recommendation.structure.Graph;
import com.andres.proyectos.el_telon.recommendation.structure.Node;
import com.andres.proyectos.el_telon.recommendation.structure.NodeType;
import com.andres.proyectos.el_telon.ticket.entity.Ticket;
import com.andres.proyectos.el_telon.ticket.repository.TicketRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Objects;
import java.util.Random;
import java.util.Set;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private static final ZoneId CINEMA_ZONE = ZoneId.of("America/Bogota");

    private final MovieRepository movieRepository;
    private final MovieFunctionRepository movieFunctionRepository;
    private final TicketRepository ticketRepository;
    private Graph graph;

    @PostConstruct
    public synchronized void initGraph(){
        refreshGraph();
    }

    private void refreshGraph(){
        this.graph = new Graph();
        loadData(this.graph);
    }

    private void loadData(Graph targetGraph){
        List<Movie> peliculas = movieRepository.findByActivoTrue().stream()
            .filter(movie -> hasUpcomingFunctions(movie.getId()))
            .toList();

        for(Movie movie : peliculas) {
            Node movieNode = new Node(String.valueOf(movie.getId()), NodeType.MOVIE, movie.getNombre());
            targetGraph.addNode(movieNode);
        }

        List<Ticket> tickets = ticketRepository.findAllWithUsuarioAndPelicula();
        for (Ticket ticket : tickets) {
            String userEmail = ticket.getUsuario().getUsername();
            String userName = ticket.getUsuario().getNombre();
            Long idMovie = ticket.getFuncion().getPelicula().getId();
            String movieName = ticket.getFuncion().getPelicula().getNombre();
            Node userNode = new Node(userEmail, NodeType.USER, userName);
            Node movieNode = new Node(String.valueOf(idMovie), NodeType.MOVIE, movieName);

            targetGraph.addEdge(userNode, movieNode, 1.0);
        }
    }

    public synchronized List<Movie> recommendMovie(String userEmail) {
        refreshGraph();

        Node userNode = new Node(userEmail, NodeType.USER, "");
        List<Edge> myShops = graph.getNeighbors(userNode);
        List<Movie> activeMovies = getShuffledActiveMovies(userEmail);

        if (myShops.isEmpty()) {
            return activeMovies.stream()
                    .limit(5)
                    .collect(Collectors.toList());
        }

        List<Long> myShoppedIds = myShops.stream()
                .map(edge -> Long.parseLong(edge.getDestination().getEmail()))
                .collect(Collectors.toList());

        List<Movie> myShoppedMovies = movieRepository.findAllById(myShoppedIds);

        Map<Category, Long> genreFrequencies = myShoppedMovies.stream()
                .collect(Collectors.groupingBy(Movie::getCategoria, Collectors.counting()));

        Category categoriaFavorita = genreFrequencies.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);

        if (categoriaFavorita == null) {
            return activeMovies.stream().limit(5).collect(Collectors.toList());
        }

        List<Movie> recommendations = activeMovies.stream()
                .filter(m -> m.getCategoria() == categoriaFavorita)
                .filter(m -> !myShoppedIds.contains(m.getId()))
                .limit(5)
                .collect(Collectors.toList());

        if (recommendations.size() < 5) {
            Set<Long> recommendationIds = recommendations.stream()
                .map(Movie::getId)
                .collect(Collectors.toSet());

            List<Movie> filler = activeMovies.stream()
                    .filter(m -> !myShoppedIds.contains(m.getId()))
                .filter(m -> !recommendationIds.contains(m.getId()))
                    .limit(5 - recommendations.size())
                    .toList();
            recommendations.addAll(filler);
        }

        return recommendations;
    }

    public synchronized void registerNewPurchase(String userEmail, String userName, Long movieId, String movieName) {
        refreshGraph();
    }

    private List<Movie> getShuffledActiveMovies(String userEmail) {
        List<Movie> activeMovies = new ArrayList<>(movieRepository.findByActivoTrue().stream()
                .filter(movie -> hasUpcomingFunctions(movie.getId()))
                .toList());
        long seed = Objects.hash(userEmail);
        Collections.shuffle(activeMovies, new Random(seed));
        return activeMovies;
    }

    private boolean hasUpcomingFunctions(Long movieId) {
        List<MovieFunction> functions = movieFunctionRepository.findByPeliculaIdOrderByFechaProyeccionAscHoraInicioAsc(movieId);
        return functions.stream()
                .anyMatch(function -> function.getFechaProyeccion()
                        .atTime(function.getHoraInicio())
                        .atZone(CINEMA_ZONE)
                        .isAfter(ZonedDateTime.now(CINEMA_ZONE)));
    }
}
