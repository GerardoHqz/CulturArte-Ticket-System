package com.grupo04.culturarte.controllers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo04.culturarte.models.dtos.MessageDTO;
import com.grupo04.culturarte.models.dtos.UserToEventDTO;
import com.grupo04.culturarte.models.entities.Events;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.models.entities.UserToEvent;
import com.grupo04.culturarte.models.entities.UserToPermission;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToEventService;
import com.grupo04.culturarte.services.UserToPermissionService;
import com.grupo04.culturarte.utils.RequestErrorHandler;
import com.grupo04.culturarte.utils.ServiceStatus;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user-event")
public class UserToEventController {
	@Autowired
	private UserToEventService userToEventService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserToPermissionService userToPermissionService;

	@Autowired
	private RequestErrorHandler errorHandler;

	@PostMapping("/")
	public ResponseEntity<?> saveUserToEvent(@RequestBody @Valid UserToEventDTO info, BindingResult validations)
			throws Exception {

		if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null)
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("asignacion de personal")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		try {
			userToEventService.save(info);
			return new ResponseEntity<>(new MessageDTO("Adding user of event OK!"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/")
	public ResponseEntity<?> getAllUserToEvent() {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("asignacion de personal")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		List<UserToEvent> userToPermissionList = userToEventService.findAll();
		return new ResponseEntity<>(userToPermissionList, HttpStatus.OK);

	}

	@DeleteMapping("/")
	public ResponseEntity<?> removeUserFromEvent(@RequestBody @Valid UserToEventDTO info, BindingResult validations) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("asignacion de personal")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		try {
			userToEventService.removeUserFromEvent(info);
			return new ResponseEntity<>(new MessageDTO("Remove user of event successful!"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/event/{eventId}")
	public ResponseEntity<?> getUsersByEvent(@PathVariable UUID eventId) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("asignacion de personal")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		List<Users> users = userToEventService.getUsersByEvent(eventId);

		if (users == null) {
			return new ResponseEntity<>(new MessageDTO("Event not found"), HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getEventsByUser(@PathVariable UUID userId) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("asignacion de personal")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		List<Events> events = userToEventService.getEventsByUser(userId);

		if (events == null) {
			return new ResponseEntity<>(new MessageDTO("Event not found"), HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<>(events, HttpStatus.OK);
	}
	
	@GetMapping("/available/{eventId}")
	public ResponseEntity<?> getUsersAvailable(@PathVariable UUID eventId, @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size){
		
		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}
		
		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("asignacion de personal")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}
		
		Pageable pageable = PageRequest.of(page, size);
		Page<Users> availableUsers = userToEventService.getUsersAvailable(pageable, eventId);
		return new ResponseEntity<>(availableUsers, HttpStatus.OK);
		
	}
	
}
