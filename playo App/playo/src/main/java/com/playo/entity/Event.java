package com.playo.entity;
import com.playo.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="_entity")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private LocalDateTime timings;
    private int playerLimit;
    private String otherRequirements;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User organizer;

    @ManyToMany
    @JoinTable(
            name = "event_participation",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> participants;

    // constructors, getters, and setters
}
