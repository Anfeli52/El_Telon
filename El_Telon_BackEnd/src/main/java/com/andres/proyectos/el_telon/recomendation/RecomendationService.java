package com.andres.proyectos.el_telon.recomendation;

import com.andres.proyectos.el_telon.movie.Category;
import com.andres.proyectos.el_telon.movie.Movie;
import com.andres.proyectos.el_telon.movie.MovieRepository;
import com.andres.proyectos.el_telon.seat.Ticket;
import com.andres.proyectos.el_telon.seat.TicketRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecomendationService {
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
            return movieRepository.findByActivoTrue().stream().limit(5).collect(Collectors.toList());
        }

        Map<String, Double> candidateMovies = new HashMap<>();

        for (Edge edgeToMovie : myShops) {
            Node movieShopped = edgeToMovie.getDestination();

            for (Edge edgeToUsers : graph.getNeighbors(movieShopped)) {
                Node otherUser = edgeToUsers.getDestination();

                if (otherUser.equals(userNode)) continue;

                for (Edge edgeToRecommendedMovie : graph.getNeighbors(otherUser)) {
                    Node recommendedMovie = edgeToRecommendedMovie.getDestination();

                    if (myShops.stream().anyMatch(e -> e.getDestination().equals(recommendedMovie))) continue;

                    candidateMovies.put(
                            recommendedMovie.getEmail(),
                            candidateMovies.getOrDefault(recommendedMovie.getEmail(), 0.0) + edgeToRecommendedMovie.getWeight()
                    );
                }
            }
        }


        if (candidateMovies.isEmpty()) {
            List<Long> myShoppedIds = myShops.stream()
                    .map(edge -> Long.parseLong(edge.getDestination().getEmail()))
                    .collect(Collectors.toList());

            List<Movie> myShoppedMovies = movieRepository.findAllById(myShoppedIds);

            List<Category> misCategorias = myShoppedMovies.stream()
                    .map(Movie::getCategoria)
                    .distinct()
                    .toList();

            return movieRepository.findByActivoTrue().stream()
                    .filter(m -> misCategorias.contains(m.getCategoria()))
                    .filter(m -> !myShoppedIds.contains(m.getId()))
                    .limit(5)
                    .collect(Collectors.toList());
        }

        List<Long> recommendedIds = candidateMovies.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(5)
                .map(entry -> Long.parseLong(entry.getKey()))
                .collect(Collectors.toList());

        return movieRepository.findAllById(recommendedIds);
    }

    public void registerNewPurchase(String userEmail, String userName, Long movieId, String movieName) {
        Node userNode = new Node(userEmail, NodeType.USER, userName);
        Node movieNode = new Node(String.valueOf(movieId), NodeType.MOVIE, movieName);
        graph.addEdge(userNode, movieNode, 1.0);
    }
}
