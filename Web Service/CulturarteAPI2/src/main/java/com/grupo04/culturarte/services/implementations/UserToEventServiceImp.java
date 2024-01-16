package com.grupo04.culturarte.services.implementations;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.UserToEventDTO;
import com.grupo04.culturarte.models.entities.Events;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.models.entities.UserToEvent;
import com.grupo04.culturarte.repositories.UserToEventRepository;
import com.grupo04.culturarte.services.EventService;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToEventService;
import com.grupo04.culturarte.services.UserToPermissionService;

import jakarta.transaction.Transactional;

@Service
public class UserToEventServiceImp implements UserToEventService {

	@Autowired
	UserToEventRepository userToEventRepository;

	@Autowired
	EventService eventService;

	@Autowired
	UserService userService;
	
	@Autowired
	UserToPermissionService userToPermissionService;

	// get all users of a event
	@Override
	public List<Users> getUsersByEvent(UUID eventId) {
		List<UserToEvent> userToEventList = userToEventRepository.findAll().stream()
				.filter(x -> x.getEvent().getEventId().equals(eventId)).collect(Collectors.toList());

		List<Users> userList = userToEventList.stream().map(UserToEvent::getUser).collect(Collectors.toList());

		return userList;
	}

	// get all events of a user
	@Override
	public List<Events> getEventsByUser(UUID userId) {
		List<UserToEvent> userToEventList = userToEventRepository.findAll().stream()
				.filter(x -> x.getUser().getUserId().equals(userId)).collect(Collectors.toList());

		List<Events> eventList = userToEventList.stream().map(UserToEvent::getEvent).collect(Collectors.toList());

		return eventList;
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(UserToEventDTO info) throws Exception {
		try {
			Users user = userService.findById(info.getUserId());
			Events event = eventService.findById(info.getEventId());

			UserToEvent userToEvent = new UserToEvent(user, event);

			userToEventRepository.save(userToEvent);

		} catch (Exception e) {
			throw new Exception("Save event od a user invalid");
		}

	}

	@Override
	public List<UserToEvent> findAll() {
		return userToEventRepository.findAll();
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void removeUserFromEvent(UserToEventDTO info) {
		List<UserToEvent> userToEvent = userToEventRepository.findAll().stream()
				.filter(x -> x.getUser().getUserId().equals(info.getUserId())
						&& x.getEvent().getEventId().equals(info.getEventId()))
				.collect(Collectors.toList());

		if (!userToEvent.isEmpty()) {
			UserToEvent userFound = userToEvent.get(0);

			userToEventRepository.delete(userFound);
		}

	}
	
	public Page<Users> getUsersAvailable(Pageable pageable, UUID eventId) {
		//obtener todos los usuarios asgiandos al evento
	    List<Users> assignedUsers = getUsersByEvent(eventId);
	    //obtener todos los usuarios 
	    UUID permissionTiketsId = UUID.fromString("39a8ab5d-2a35-4ed2-83b9-78161e12e7b1");
	    Page<Users> availableUsers = userToPermissionService.getUsersWithEmployeePermission(pageable, permissionTiketsId);
	    List<Users> usersWithPermission  = availableUsers.getContent();
	    
	 // Filtrar los usuarios disponibles que no están asignados al evento
	    List<Users> filteredUsers = usersWithPermission.stream()
	            .filter(user -> !assignedUsers.contains(user))
	            .collect(Collectors.toList());

	    return new PageImpl<>(filteredUsers, pageable, filteredUsers.size());
	}


}
