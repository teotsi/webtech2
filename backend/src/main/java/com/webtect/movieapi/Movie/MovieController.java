package com.webtect.movieapi.Movie;

import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@Transactional
public class MovieController {

    private final MovieService service;


    @GetMapping(value = "/user/{userId}/movies", produces ={"application/collection+json" })
    public List<RepresentationModel<Movie>> getMoviesById(@PathVariable(value = "userId") String userId) {
        return service.findByUserId(userId);
    }

    @GetMapping("/user/{userId}/movies/{movieId}")
    public HttpEntity<Movie> getMovieById(@PathVariable(value = "userId") String userId, @PathVariable(value = "movieId") String movieId){
        return service.findByIdAndUserId(movieId, userId);
    }

    @PutMapping("/user/{userId}/movies")
    public void saveMovie(@PathVariable(value = "userId") String userId,
                          @RequestBody Movie movie,
                          Principal principal) {
         service.saveMovie(userId, movie, principal);
    }

    @DeleteMapping("/user/{userId}/movies/{movieId}")
    public void deleteMovie(@PathVariable(value = "userId") String userId,
                            @PathVariable(value = "movieId") String movieId,
                            Principal principal){

        service.deleteMovie(userId,movieId,principal);
    }
}
