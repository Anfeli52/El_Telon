package com.andres.proyectos.el_telon.review;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.andres.proyectos.el_telon.movie.entity.Movie;
import com.andres.proyectos.el_telon.movie.repository.MovieRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;

    public List<ReviewResponse> getReviews(Long movieId) {
        movieRepository.findByIdAndActivoTrue(movieId)
                .orElseThrow(() -> new RuntimeException("Pelicula no encontrada"));

        return reviewRepository.findByPeliculaIdAndPadreIsNullOrderByFechaCreacionDesc(movieId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ReviewResponse createReview(Long movieId, ReviewRequest request) {
        Movie movie = movieRepository.findByIdAndActivoTrue(movieId)
                .orElseThrow(() -> new RuntimeException("Pelicula no encontrada"));

        Review review = Review.builder()
                .pelicula(movie)
                .autor(request.getAutor().trim())
                .comentario(request.getComentario().trim())
                .calificacion(request.getCalificacion())
                .fechaCreacion(LocalDateTime.now())
                .likes(0)
                .dislikes(0)
                .build();

        return toResponse(reviewRepository.save(review));
    }

    public ReviewResponse createReply(Long movieId, Long reviewId, ReviewRequest request) {
        Movie movie = movieRepository.findByIdAndActivoTrue(movieId)
                .orElseThrow(() -> new RuntimeException("Pelicula no encontrada"));

        Review parent = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Resena no encontrada"));

        Review reply = Review.builder()
                .pelicula(movie)
                .padre(parent)
                .autor(request.getAutor().trim())
                .comentario(request.getComentario().trim())
                .calificacion(request.getCalificacion())
                .fechaCreacion(LocalDateTime.now())
                .likes(0)
                .dislikes(0)
                .build();

        return toResponse(reviewRepository.save(reply));
    }

    public ReviewResponse likeReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Resena no encontrada"));

        review.setLikes(review.getLikes() + 1);
        return toResponse(reviewRepository.save(review));
    }

    public ReviewResponse unlikeReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Resena no encontrada"));

        review.setLikes(Math.max(0, review.getLikes() - 1));
        return toResponse(reviewRepository.save(review));
    }

    public ReviewResponse dislikeReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Resena no encontrada"));

        review.setDislikes(review.getDislikes() + 1);
        return toResponse(reviewRepository.save(review));
    }

    public ReviewResponse undislikeReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Resena no encontrada"));

        review.setDislikes(Math.max(0, review.getDislikes() - 1));
        return toResponse(reviewRepository.save(review));
    }

        public void deleteReview(Long reviewId) {
                Review review = reviewRepository.findById(reviewId)
                                .orElseThrow(() -> new RuntimeException("Resena no encontrada"));

                // Cascade + orphanRemoval on respuestas will remove children
                reviewRepository.delete(review);
        }

    private ReviewResponse toResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .autor(review.getAutor())
                .comentario(review.getComentario())
                .calificacion(review.getCalificacion())
                .fechaCreacion(String.valueOf(review.getFechaCreacion()))
                .likes(review.getLikes())
                .dislikes(review.getDislikes())
                .respuestas(review.getRespuestas().stream()
                        .map(this::toResponse)
                        .toList())
                .build();
    }
}
