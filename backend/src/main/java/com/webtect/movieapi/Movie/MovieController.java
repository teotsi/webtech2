package com.webtect.movieapi.Movie;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MovieController {

    private final MovieService service;

    @GetMapping("/user/{userId}/movies")
    public List<Movie> getMoviesById(@PathVariable(value = "userId") String userId) {
        return service.findByUserId(userId);
    }

    @PutMapping("/user/{userId}/movies")
    public List<Movie> saveMovie(@PathVariable(value = "userId") String userId, @RequestBody Movie movie, Principal principal) {
        service.saveMovie(movie, principal);
        return service.findByUserId(userId);
    }
}
