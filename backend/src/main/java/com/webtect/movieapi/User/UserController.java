package com.webtect.movieapi.User;

import com.webtect.movieapi.Movie.MovieController;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Collection;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserDetailServiceImpl userDetailService;

    @GetMapping(value = "/user/{id}", produces = {"application/json"})
    public HttpEntity<User> getUser(@PathVariable("id") String id, Principal principal) {
        UserDetailsImpl currentUser = (UserDetailsImpl) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        User user = currentUser.getUser();
        if (!user.hasLinks()){
            user.add(linkTo(methodOn(UserController.class).getUser(id,principal)).withSelfRel());
            user.add(linkTo(methodOn(MovieController.class).getMoviesById(id)).withRel("movies"));
        }
        return id.equals(currentUser.getId()) ? new ResponseEntity<>(user, HttpStatus.OK) : null;
    }

    @GetMapping("/user/me")
    public HttpEntity<User> getLoggedInUser(Principal principal) {
        if (principal != null) {
            User user = ((UserDetailsImpl)
                    ((UsernamePasswordAuthenticationToken) principal)
                            .getPrincipal()).getUser();
              return getUser(user.getId(),principal);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You need to log in");
        }
    }

    @PutMapping("/user/")
    public UserDetails registerUser(@RequestBody User user) {
        return userDetailService.registerUser(user);
    }
}
