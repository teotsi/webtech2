package com.webtect.movieapi.User;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByEmail(s);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + s));
        return user.map(UserDetailsImpl::new).get();
    }

    public UserDetails registerUser(User user) {
        Optional<User> userExists = userRepository.findByEmail(user.getEmail());
        userExists.ifPresent(s -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email is taken!");
        });
        user.setActive(true);
        user.setPassword(CustomPasswordEncoder.getPasswordEncoder().encode(user.getPassword()));
        user.setRoles("ROLE_USER");
        userRepository.save(user);
        return new UserDetailsImpl(user);
    }
}
