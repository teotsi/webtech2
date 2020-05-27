package com.webtect.movieapi;

import com.webtect.movieapi.Movie.MovieRepository;
import com.webtect.movieapi.User.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaAuditing
@EnableJpaRepositories(basePackageClasses = {UserRepository.class, MovieRepository.class})
public class MovieapiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieapiApplication.class, args);
    }

}
