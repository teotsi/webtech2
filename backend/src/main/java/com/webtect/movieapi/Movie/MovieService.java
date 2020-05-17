package com.webtect.movieapi.Movie;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    public List<Movie> getMovies(){
        return this.movieRepository.findAll();
    }

    public Movie getMovie(String id){
        return this.movieRepository.findById(id).orElseThrow(MovieNotFoundException::new);
    }

    public void saveMovie(Movie movie){
        movieRepository.save(movie);
    }
}
