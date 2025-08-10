package com.playo.dto;

import com.playo.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventDetailsDto {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime timings;
    private int playerLimit;
    private String otherRequirements;
    private OrganizerDto organizer;
    private List<ParticipantDto> participants;
    private int totalParticipants;
    private boolean isOrganizer; //
}
