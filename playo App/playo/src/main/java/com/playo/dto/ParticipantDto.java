package com.playo.dto;

import com.playo.entity.EventStatus;
import com.playo.entity.ParticipationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private EventStatus status;
    private ParticipationStatus participationStatus;
}
