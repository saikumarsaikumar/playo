package com.playo.config;

import com.playo.user.User;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import com.playo.config.SecurityConfigration;

import java.io.IOException;
import java.util.logging.Logger;

import org.slf4j.LoggerFactory;
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(@Nonnull HttpServletRequest request, @Nonnull HttpServletResponse response, @Nonnull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        // Check if the request matches any of the whitelisted URLs
        final String requestURI = request.getRequestURI();
        System.out.println("JwtAuthenticationFilter - Incoming Request URI: " + requestURI);
        
        AntPathMatcher pathMatcher = new AntPathMatcher();
        for (String whitelist : SecurityConfigration.WHITE_LIST_URL) {
            if (pathMatcher.match(whitelist, requestURI)) {
                System.out.println("JwtAuthenticationFilter - Whitelisted Request: " + requestURI);
                filterChain.doFilter(request, response);
                return;
            }
        }
        
        if(authHeader ==null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        jwt = authHeader.substring(7);
        System.out.println(jwt);
        System.out.println("Token Printed");
        try {
            userEmail = jwtService.extractUserEmail(jwt);
        } catch (Exception e) {
            sendCustomErrorResponse(response, "Invalid Credintials.", HttpServletResponse.SC_FORBIDDEN);
            return;
        }
        System.out.println(userEmail);
        //System.out.println(jwtService.isTokenValid(jwt,userDetails));
        if(userEmail !=null && SecurityContextHolder.getContext().getAuthentication() ==null){
            User userDetails = (User) this.userDetailsService.loadUserByUsername(userEmail);
            System.out.println("Auth Success");
            if(jwtService.isTokenValid(jwt,userDetails)){
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                                                                        userDetails,
                                                                               null,
                                                                                        userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        else {
            // Add a custom error message here
            System.out.println("Auth Failure");
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid User Credintials");
            return;
        }
        filterChain.doFilter(request,response);

    }

    private void sendCustomErrorResponse(HttpServletResponse response, String message, int status) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write("{ \"message\": \"" + message + "\" }");
        response.getWriter().flush();
        response.getWriter().close();
    }
}
