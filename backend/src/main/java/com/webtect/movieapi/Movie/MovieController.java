package com.webtect.movieapi.Movie;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/movie")
public class MovieController {

    private final MovieService service;

    @GetMapping("")
    public List<Movie> getMovies() {
        return service.getMovies();
    }

    @PostMapping("")
    public void saveMovie(@RequestBody Movie movie) {
        service.saveMovie(movie);
    }

    @GetMapping("/{id}")
    public Movie getMovies(@PathVariable String id) {
        return service.getMovie(id);
    }
}