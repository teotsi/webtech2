package com.webtect.movieapi.Movie;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Movie was not found!")
public class MovieNotFoundException extends RuntimeException{
}
