package com.webtect.movieapi.Movie;

import com.webtect.movieapi.User.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository repository;


    public List<Movie> findByUserId(String userId) {
        return repository.findByUserId(userId);
    }

    public void saveMovie(Movie movie, Principal principal){
        movie.setUser(((UserDetailsImpl) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUser());
        repository.save(movie);
    }

}
