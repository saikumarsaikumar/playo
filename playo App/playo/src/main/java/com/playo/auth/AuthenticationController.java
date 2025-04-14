package com.playo.auth;

import com.playo.config.JwtService;
import com.playo.entity.Event;
import com.playo.service.EventService;
import com.playo.user.User;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth") // Global requirement
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    
    @PostMapping("/register")
    @SecurityRequirement(name = "") // No security requirement for this route
    public ResponseEntity<AuthenticationResponse> register(@RequestBody  RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }




    @PostMapping("/authenticate")
    @SecurityRequirement(name = "") // No security requirement for this route
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody  AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/logout")
    @SecurityRequirement(name = "") // No security requirement for this route
    public ResponseEntity<AuthenticationResponse> authenticate(){
        return ResponseEntity.ok(authenticationService.logout());
    }

    @GetMapping("/getCurrentUser")
    public ResponseEntity<User> getUser(){

       /* Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
       // String userEmail = jwtService.extractUserEmail(jwt);
       User user= (User) authentication.getPrincipal();
       user.setPassword(null);
        // You can access more details from the authentication object, such as authorities, etc.
        return ResponseEntity.ok(user); */
        return  ResponseEntity.ok(authenticationService.getCurrentUser());
    }


}
