package com.playo.service;

import com.playo.auth.AuthenticationService;
import com.playo.entity.Event;
import com.playo.entity.EventStatus;
import com.playo.exceptions.CustomAuthenticationException;
import com.playo.repository.EventRepository;
import com.playo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service

@RequiredArgsConstructor
public class EventService {
    @Autowired
    EventRepository eventRepository;
    @Autowired
    AuthenticationService authenticationService;
    public Event createEvent(Event event) {
        try{
            User user = authenticationService.getCurrentUser();
            event.setOrganizer(user);
            return eventRepository.save(event);
        }
        catch(Exception e){
            throw  new CustomAuthenticationException("Invalid Credintials");
        }

    }
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    public List<Event> getMyEvents() {
        User user = authenticationService.getCurrentUser();
        User user1 = User.builder()
                .firstName(user.getFirstName())
                .Id(user.getId())
                .lastName(user.getLastName())
                .role(user.getRole())
                .email(user.getEmail())
                .build();
       // Optional<Event> optionalEvents = eventRepository.findByOrganizer(user1);
        //return optionalEvents.map(Collections::singletonList).orElse(Collections.emptyList());
        return eventRepository.findByOrganizer(user1);
    }
}
