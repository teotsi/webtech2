package com.webtect.movieapi.Movie;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public @Data
class Movie {

    @Id
    String id;

}