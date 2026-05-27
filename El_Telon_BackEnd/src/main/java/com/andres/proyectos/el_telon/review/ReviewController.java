package com.andres.proyectos.el_telon.review;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/movies/{movieId}/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getReviews(@PathVariable Long movieId) {
        return ResponseEntity.ok(reviewService.getReviews(movieId));
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(
            @PathVariable Long movieId,
            @Valid @RequestBody ReviewRequest request
    ) {
        return ResponseEntity.ok(reviewService.createReview(movieId, request));
    }

    @PostMapping("/{reviewId}/replies")
    public ResponseEntity<ReviewResponse> createReply(
            @PathVariable Long movieId,
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewRequest request
    ) {
        return ResponseEntity.ok(reviewService.createReply(movieId, reviewId, request));
    }

    @PutMapping("/{reviewId}/like")
    public ResponseEntity<ReviewResponse> likeReview(@PathVariable Long reviewId) {
        return ResponseEntity.ok(reviewService.likeReview(reviewId));
    }

    @PutMapping("/{reviewId}/unlike")
    public ResponseEntity<ReviewResponse> unlikeReview(@PathVariable Long reviewId) {
        return ResponseEntity.ok(reviewService.unlikeReview(reviewId));
    }

    @PutMapping("/{reviewId}/dislike")
    public ResponseEntity<ReviewResponse> dislikeReview(@PathVariable Long reviewId) {
        return ResponseEntity.ok(reviewService.dislikeReview(reviewId));
    }

    @PutMapping("/{reviewId}/undislike")
    public ResponseEntity<ReviewResponse> undislikeReview(@PathVariable Long reviewId) {
        return ResponseEntity.ok(reviewService.undislikeReview(reviewId));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}
