package com.webtect.movieapi.User;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserDetailServiceImpl userDetailService;

    @GetMapping("/user/{id}")
    public UserDetailsImpl getUser(@PathVariable("id") String id, Principal principal) {
        UserDetailsImpl currentUser = (UserDetailsImpl) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();

        return id.equals(currentUser.getId()) ? currentUser : new UserDetailsImpl();
    }

    @GetMapping("/user/me")
    public UserDetails getLoggedInUser(Principal principal) {
        if (principal != null) {
            return (UserDetailsImpl) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You need to log in");
        }
    }

    @PutMapping("/user/")
    public UserDetails registerUser(@RequestBody User user) {
        return userDetailService.registerUser(user);
    }
}
