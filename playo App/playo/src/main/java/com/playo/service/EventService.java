package com.playo.service;

import com.playo.auth.AuthenticationService;
import com.playo.dto.EventDetailsDto;
import com.playo.dto.OrganizerDto;
import com.playo.dto.ParticipantDto;
import com.playo.entity.Event;
import com.playo.entity.EventParticipation;
import com.playo.entity.EventStatus;
import com.playo.exceptions.CustomAuthenticationException;
import com.playo.repository.EventParticipationRepository;
import com.playo.repository.EventRepository;
import com.playo.repository.UserRepository;
import com.playo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service

@RequiredArgsConstructor
public class EventService {
    @Autowired
    EventRepository eventRepository;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EventParticipationRepository eventParticipationRepository;
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
        User user1 = User.builder().firstName(user.getFirstName()).id(user.getId()).lastName(user.getLastName()).email(user.getEmail()).password(null)
                .build();
       // Optional<Event> optionalEvents = eventRepository.findByOrganizer(user1);
        //return optionalEvents.map(Collections::singletonList).orElse(Collections.emptyList());
        return eventRepository.findByOrganizer(user1);
    }
    public Event getEventById(Long eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            throw new RuntimeException("Event not found with id: " + eventId);
        }
        return eventOptional.get();
    }

    // Simplified method to get event details with participants
    public EventDetailsDto getEventDetailsById(Long eventId) {
        // 1. Get the event
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            throw new RuntimeException("Event not found with id: " + eventId);
        }
        Event event = eventOptional.get();

        // 2. Get current user for permission checking
        User currentUser = authenticationService.getCurrentUser();

        // 3. Check if current user is the organizer
        boolean isOrganizer = event.getOrganizer() != null &&
                event.getOrganizer().getId().equals(currentUser.getId());

        // 4. Get participants only if user is organizer
        List<ParticipantDto> participants = new ArrayList<>();
        if (isOrganizer) {
            // Get List<EventParticipation> by event ID
            List<EventParticipation> participations = eventParticipationRepository.findByEventId(eventId);

            // Extract List<UserID> from participations
            List<Long> userIds = participations.stream()
                    .map(participation -> participation.getUser().getId())
                    .collect(Collectors.toList());

            // Get user details for all user IDs
            List<User> users = userRepository.findByIdIn(userIds);

            // Create a map for quick user lookup
            Map<Long, User> userMap = users.stream()
                    .collect(Collectors.toMap(User::getId, user -> user));

            // Create List<ParticipantDto> by combining participation and user data
            participants = participations.stream()
                    .map(participation -> {
                        User user = userMap.get(participation.getUser().getId());
                        return ParticipantDto.builder()
                                .userId(user.getId())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .email(user.getEmail())
                                .status(participation.getStatus())
                                .participationStatus(participation.getParticipationStatus())
                                .build();
                    })
                    .collect(Collectors.toList());
        }

        // 5. Build and return EventDetailsDto with safe organizer data
        return EventDetailsDto.builder()
                .id(event.getId())
                .name(event.getName())
                .description(event.getDescription())
                .timings(event.getTimings())
                .playerLimit(event.getPlayerLimit())
                .otherRequirements(event.getOtherRequirements())
                .organizer(convertToOrganizerDto(event.getOrganizer())) // Safe organizer data
                .participants(participants) // Empty if not organizer
                .totalParticipants(participants.size())
                .isOrganizer(isOrganizer) // Indicates permission level
                .build();
    }


    private OrganizerDto convertToOrganizerDto(User user) {
        if (user == null) return null;

        return OrganizerDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                // Intentionally not including email, ID, or other sensitive data
                .build();
    }
}
