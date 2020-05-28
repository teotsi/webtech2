package com.webtect.movieapi;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.webtect.movieapi.User.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserDetailsImpl implements UserDetails {

    private String id;
    private String email;
    private String password;
    private boolean active;
    private List<GrantedAuthority> authorities;
    @JsonIgnore
    private User user;

    public UserDetailsImpl(User user) {
        this.user =user;
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.active = user.isActive();
        this.id = user.getId();
        this.authorities = Arrays.stream(user.getRoles().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }

}
