package com.grupo04.culturarte.services;

import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.grupo04.culturarte.models.dtos.UserToEventDTO;
import com.grupo04.culturarte.models.entities.Events;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.models.entities.UserToEvent;

public interface UserToEventService {
	void save(UserToEventDTO info) throws Exception;
	List<UserToEvent> findAll();
	void removeUserFromEvent(UserToEventDTO info);
	List<Users> getUsersByEvent(UUID eventId); //All user from event
    List<Events> getEventsByUser(UUID userId); //All event from user
    Page<Users> getUsersAvailable(Pageable pageable, UUID eventId) ; //All user available
}
