package com.playo.auth;

import com.playo.config.JwtService;
import com.playo.exceptions.CustomAuthenticationException;
import com.playo.user.Role;
import com.playo.user.User;
import com.playo.user.UserRepository;
import io.jsonwebtoken.impl.crypto.JwtSigner;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;
    @Autowired
    AuthenticationManager authenticationManager;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        System.out.println("Authenticate req");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            String jwtToken = jwtService.generateToken(user);

            return AuthenticationResponse
                    .builder()
                    .token(jwtToken)
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .id(user.getId())
                    .build();
        } catch (BadCredentialsException e) {
            // Handle authentication failure and send a custom error response
            throw new CustomAuthenticationException("Invalid email or password");
        }
    }
    public AuthenticationResponse register(RegisterRequest request) {
        User user = User
                .builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }
    public AuthenticationResponse logout() {
        return  AuthenticationResponse
                .builder()
                .token(null)
                .email(null)
                .firstName(null)
                .lastName(null)
                .build();
    }
    public User getCurrentUser() {
         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
       // String userEmail = jwtService.extractUserEmail(jwt);
       User user= (User) authentication.getPrincipal();
       user.setPassword(null);
        // You can access more details from the authentication object, such as authorities, etc.
        return (user);
    }
}
