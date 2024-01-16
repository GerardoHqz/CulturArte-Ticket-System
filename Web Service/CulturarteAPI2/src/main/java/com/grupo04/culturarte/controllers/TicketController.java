package com.grupo04.culturarte.controllers;

import java.time.LocalDate;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo04.culturarte.models.dtos.MessageDTO;
import com.grupo04.culturarte.models.dtos.PurchaseTicketDTO;
import com.grupo04.culturarte.models.dtos.UpdateTicketDTO;
import com.grupo04.culturarte.models.entities.Ticket;
import com.grupo04.culturarte.models.entities.UserToPermission;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.services.TicketService;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToPermissionService;
import com.grupo04.culturarte.utils.RequestErrorHandler;
import com.grupo04.culturarte.utils.ServiceStatus;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/ticket")
public class TicketController {
	@Autowired
	private TicketService ticketService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserToPermissionService userToPermissionService;

	@Autowired
	private RequestErrorHandler errorHandler;

	@PostMapping("/")
	public ResponseEntity<?> saveTicket(@RequestBody @Valid PurchaseTicketDTO info, BindingResult validations)
			throws Exception {

		if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		Users userFound = userService.findUserAuthenticated();
		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de tickets")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}
		
		if(!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);
		
			if(userFound == null)
				return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
			
			try {
				ticketService.save(info);
				return new ResponseEntity<>(new MessageDTO("Tickets created!"), HttpStatus.OK);
				
			} catch (Exception e) {
				if (e.getMessage().equals("Sold out!"))
					return new ResponseEntity<>(new MessageDTO("Sold out!"), HttpStatus.CONFLICT);
				else if(e.getMessage().equals("Not enough"))
					return new ResponseEntity<>(new MessageDTO("Not enough tickets. Try purchasing less"), HttpStatus.CONFLICT);
				else {
					e.printStackTrace();
					return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
		}

	@DeleteMapping("/{ticketId}")
	public ResponseEntity<?> deleteTicket(@PathVariable UUID ticketId) throws Exception {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null)
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de tickets")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		Ticket ticket = ticketService.findById(ticketId);

		if (ticket == null) {
			return new ResponseEntity<>(new MessageDTO("Ticket not found"), HttpStatus.NOT_FOUND);
		}

		try {

			ticketService.delete(ticketId);
			return new ResponseEntity<>(new MessageDTO("Event is deleted"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/")
	public ResponseEntity<?> updateTicket(@RequestBody @Valid UpdateTicketDTO info, BindingResult validations) throws Exception {
		
		Users userFound = userService.findUserAuthenticated();
		if (userFound == null)
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de tickets")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		if (ticketService.findById(info.getTicketId()) == null) {
			return new ResponseEntity<>(new MessageDTO("Ticket not found"), HttpStatus.NOT_FOUND);
		} else if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		try {
			ticketService.update(info);
			return new ResponseEntity<>(new MessageDTO("Ticket updated!"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/")
	public ResponseEntity<?> getAllTickets(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de tickets")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}
		
		Pageable pageable = PageRequest.of(page, size);
		Page<Ticket> tickets = ticketService.findAllPageable(pageable);
		return new ResponseEntity<>(tickets, HttpStatus.OK);
	}

	@GetMapping("/user/")
	public ResponseEntity<?> getAllTicketsByUser(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de tickets")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}
		
		Pageable pageable = PageRequest.of(page, size);
		Page<Ticket> tickets = ticketService.finAllTicketsByUser(pageable, userFound.getUserId());

		if (tickets == null) {
			return new ResponseEntity<>(new MessageDTO("Ticket not found"), HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<>(tickets, HttpStatus.OK);
	}

	@GetMapping("/user/past/")
	public ResponseEntity<?> getPastTicketsByUser(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de tickets")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}
		LocalDate date = LocalDate.now();
		Pageable pageable = PageRequest.of(page, size);
		Page<Ticket> tickets = ticketService.findtPastTicketsByUser(pageable, userFound.getUserId(), date);
		return new ResponseEntity<>(tickets, HttpStatus.OK);

	}

	@GetMapping("/user/upcoming/")
	public ResponseEntity<?> getUpcomingTicketsByUser(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de tickets")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}
		LocalDate date = LocalDate.now();
		Pageable pageable = PageRequest.of(page, size);
		Page<Ticket> tickets = ticketService.findUpcomingTicketsByUser(pageable, userFound.getUserId(), date);
		return new ResponseEntity<>(tickets, HttpStatus.OK);
	}

	@GetMapping("/{ticketId}")
	public ResponseEntity<?> getTicketById(@PathVariable UUID ticketId) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de tickets")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		Ticket tickets = ticketService.findById(ticketId);
		return new ResponseEntity<>(tickets, HttpStatus.OK);
	}

	@PatchMapping("/redeem/{ticketId}")
	public ResponseEntity<?> redeemTicket(@PathVariable UUID ticketId) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("validacion de tickets")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		Ticket ticket = ticketService.findById(ticketId);

		if (ticket == null) {
			return new ResponseEntity<>(new MessageDTO("Ticket not found"), HttpStatus.NOT_FOUND);
		}

		try {
			ticketService.redeemTicket(ticketId);
			return new ResponseEntity<>(new MessageDTO("Ticket is " + ticket.getRedmed()), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/{eventId}/tickets")
	public ResponseEntity<?> getAllTicketsByEvent(@PathVariable UUID eventId){
		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);
		Users userFound = userService.findUserAuthenticated();
		
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}
		
		List<Ticket> tickets = ticketService.getAllTicketsByEventId(eventId);
		return new ResponseEntity<>(tickets, HttpStatus.OK);
	}

}