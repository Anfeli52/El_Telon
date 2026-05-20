package com.andres.proyectos.el_telon.recommendation.service;

import com.andres.proyectos.el_telon.movie.entity.Category;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final MovieRepository movieRepository;
    private final TicketRepository ticketRepository;
    private Graph graph;

    @PostConstruct
    public void initGraph(){
        this.graph = new Graph();
        loadData();
    }

    private void loadData(){
        List<Movie> peliculas = movieRepository.findByActivoTrue();

        for(Movie movie : peliculas) {
            Node movieNode = new Node(String.valueOf(movie.getId()), NodeType.MOVIE, movie.getNombre());
            graph.addNode(movieNode);
        }

        List<Ticket> tickets = ticketRepository.findAllWithUsuarioAndPelicula();
        for (Ticket ticket : tickets) {
            String userEmail = ticket.getUsuario().getUsername();
            Long idMovie = ticket.getFuncion().getPelicula().getId();

            Node userNode = new Node(userEmail, NodeType.USER, "");
            Node movieNode = new Node(String.valueOf(idMovie), NodeType.MOVIE, "");

            graph.addEdge(userNode, movieNode, 1.0);
        }

        graph.printGraph();
    }

    public List<Movie> recommendMovie(String userEmail) {
        Node userNode = new Node(userEmail, NodeType.USER, "");
        List<Edge> myShops = graph.getNeighbors(userNode);

        if (myShops.isEmpty()) {
            return movieRepository.findByActivoTrue().stream()
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
            return movieRepository.findByActivoTrue().stream().limit(5).collect(Collectors.toList());
        }

        List<Movie> recommendations = movieRepository.findByActivoTrue().stream()
                .filter(m -> m.getCategoria() == categoriaFavorita)
                .filter(m -> !myShoppedIds.contains(m.getId()))
                .limit(5)
                .collect(Collectors.toList());

        if (recommendations.size() < 5) {
            List<Movie> filler = movieRepository.findByActivoTrue().stream()
                    .filter(m -> !myShoppedIds.contains(m.getId()))
                    .filter(m -> !recommendations.contains(m))
                    .limit(5 - recommendations.size())
                    .toList();
            recommendations.addAll(filler);
        }

        return recommendations;
    }

    public void registerNewPurchase(String userEmail, String userName, Long movieId, String movieName) {
        Node userNode = new Node(userEmail, NodeType.USER, "");
        Node movieNode = new Node(String.valueOf(movieId), NodeType.MOVIE, "");
        graph.addEdge(userNode, movieNode, 1.0);
    }
}
