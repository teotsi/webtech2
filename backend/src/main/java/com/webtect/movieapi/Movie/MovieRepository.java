package com.webtect.movieapi.Movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, MovieId> {
    List<Movie> findByUserId(String userId);
    void deleteByUserIdAndId(String userId, String Id);

    Optional<Movie> findByIdAndUserId(String id, String userId);
}
