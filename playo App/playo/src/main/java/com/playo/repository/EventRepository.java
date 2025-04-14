package com.playo.repository;
import com.playo.entity.Event;
import com.playo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // You can add custom query methods here if needed
    List<Event> findByOrganizer(User  user);
}
