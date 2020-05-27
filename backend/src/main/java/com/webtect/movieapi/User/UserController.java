package com.webtect.movieapi.User;

import com.webtect.movieapi.UserDetailsImpl;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserController {

    @GetMapping("/user/{id}")
    public UserDetailsImpl getUser(@PathVariable("id") String id, Principal principal) {
        UserDetailsImpl currentUser = (UserDetailsImpl) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();

        return id.equals(currentUser.getId()) ? currentUser : new UserDetailsImpl();
    }
}
