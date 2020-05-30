package com.webtect.movieapi.User;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
        user.setActive(true);
        user.setRoles("ROLE_USER");
        userRepository.save(user);
        return new UserDetailsImpl(user);
    }
}
