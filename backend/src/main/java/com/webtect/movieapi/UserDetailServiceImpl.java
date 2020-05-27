package com.webtect.movieapi;

import com.webtect.movieapi.User.User;
import com.webtect.movieapi.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByEmail(s);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + s));
        return user.map(UserDetailsImpl::new).get();
    }
}
