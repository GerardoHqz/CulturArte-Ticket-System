package com.grupo04.culturarte.services;

import java.time.LocalDate;

import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.grupo04.culturarte.models.dtos.AddEventDTO;
import com.grupo04.culturarte.models.dtos.UpdateEventDTO;
import com.grupo04.culturarte.models.entities.Events;

public interface EventService {
	
	//Services of EVENTOS
    List<Events> findAll();
    Events findById(UUID event) throws Exception;
    
    //Pagination
    Page<Events> findAllPageable(Pageable pageable);
    Page<Events> getPastEvents(Pageable pageable, LocalDate date);
    Page<Events> getUpcomingEvents(Pageable pageable, LocalDate date);
    Page<Events> getEventsByCategory(Pageable pageable, String category);
    Page<Events> getUpcomingEventsByCategory(Pageable pageable, String category);
    Page<Events> getPastEventsByCategory(Pageable pageable, String category);
    
    //Estadistic
    List<Map<String, Object>> popularPlaceEvent();
    
    //Management Services EVENTOS
    void save(AddEventDTO event) throws Exception; 
    void update(UpdateEventDTO event,UUID id) throws Exception; 
    void toogleEvent(UUID eventId) throws Exception;
}