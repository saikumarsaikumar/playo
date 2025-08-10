package com.playo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrganizerDto {
    private String firstName;
    private String lastName;
    // Note: No email, password, or ID for privacy
}
