package com.webtect.movieapi.Movie;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.webtect.movieapi.User.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "movie", schema = "public")
@Getter
@Setter
public class Movie {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

}
