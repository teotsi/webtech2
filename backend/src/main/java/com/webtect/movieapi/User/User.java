package com.webtect.movieapi.User;

import com.webtect.movieapi.Movie.Movie;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@Table(name = "user", schema = "public")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @NotNull
    private String email;

    @NotNull
    private String password;
    private boolean active;
    private String roles;

}
