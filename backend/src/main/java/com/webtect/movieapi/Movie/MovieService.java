package com.webtect.movieapi.Movie;

import com.webtect.movieapi.User.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository repository;


    public List<Movie> findByUserId(String userId) {
        return repository.findByUserId(userId);
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

}
