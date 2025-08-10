package com.playo.repository;
import com.playo.entity.EventParticipation;
import com.playo.entity.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventParticipationRepository extends JpaRepository<EventParticipation, Long> {
    // You can add custom query methods here if needed

    // Find all participants for a specific event
    List<EventParticipation> findByEventId(Long eventId);
    List<EventParticipation> findByEventIdAndUserId(Long id,Long userId);
}

