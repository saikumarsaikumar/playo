package com.playo.repository;
import com.playo.entity.EventParticipation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventParticipationRepository extends JpaRepository<EventParticipation, Long> {
    // You can add custom query methods here if needed
}

