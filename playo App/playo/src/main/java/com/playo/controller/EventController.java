package com.playo.controller;

import com.playo.entity.Event;
import com.playo.service.EventService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@SecurityRequirement(name = "bearerAuth") // Global requirement
@RequiredArgsConstructor
public class EventController {

    @Autowired
     EventService eventService;

    @PostMapping("/createEvent")
    public ResponseEntity<Event> createEvent(@RequestBody Event event){
        System.out.println("Controller Called");
        return ResponseEntity.ok(eventService.createEvent(event));
    }

    @GetMapping("/getAllEvents")
    public ResponseEntity<List<Event>> getAllEvents(){
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/getMyEvents")
    public ResponseEntity<List<Event>> getMyEvents(){
        return ResponseEntity.ok(eventService.getMyEvents());
    }

}
