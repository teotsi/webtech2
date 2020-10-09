package com.webtect.movieapi.Movie;

import com.webtect.movieapi.User.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository repository;


    public List<RepresentationModel<Movie>> findByUserId(String userId) {
        List<Movie> movies = repository.findByUserId(userId);
        List<RepresentationModel<Movie>> models = new ArrayList<>();
        for (final Movie movie : movies) {
            Link selfLink = linkTo(methodOn(MovieController.class)
                    .getMovieById(userId,movie.getId())).withRel(movie.getId());
            models.add(new RepresentationModel<Movie>().add(selfLink));
        }
        return models;
    }

    public void saveMovie(String userId, Movie movie, Principal principal) {
        if (principal!=null) { //user should be logged in
            UserDetailsImpl userPrincipal = (UserDetailsImpl)
                    ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            if (userId.equals(userPrincipal.getId())) {
                movie.setUser(userPrincipal.getUser()); //setting user for the movie and saving it
                repository.save(movie);
                return;
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"You can only save movies to your own account");
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You need to be logged in!");
    }

    public void deleteMovie(String userId, String movieId, Principal principal){
        if (principal!=null){
            UserDetailsImpl userPrincipal = (UserDetailsImpl)
                    ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
            if (userId.equals(userPrincipal.getId())) {
                repository.deleteByUserIdAndId(userId,movieId);
                return;
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"You can only delete movies on your own account");
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You need to be logged in!");
    }

    public HttpEntity<Movie> findByIdAndUserId(String movieId, String userId ) {
        Optional<Movie> movieOptional = repository.findByIdAndUserId(movieId, userId);
        movieOptional.orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Not found"));

        Movie movie = movieOptional.get();
        movie.add(linkTo(methodOn(MovieController.class).getMovieById(userId,movieId)).withSelfRel());
        return new ResponseEntity<>(movie,HttpStatus.OK);
    }
}
