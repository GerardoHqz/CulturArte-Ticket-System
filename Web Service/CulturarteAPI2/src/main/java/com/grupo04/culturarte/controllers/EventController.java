package com.grupo04.culturarte.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo04.culturarte.models.dtos.AddEventDTO;
import com.grupo04.culturarte.models.dtos.EmailDetails;
import com.grupo04.culturarte.models.dtos.MessageDTO;
import com.grupo04.culturarte.models.dtos.UpdateEventDTO;
import com.grupo04.culturarte.models.entities.Events;
import com.grupo04.culturarte.models.entities.Ticket;
import com.grupo04.culturarte.models.entities.UserToPermission;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.services.EmailService;
import com.grupo04.culturarte.services.EventService;
import com.grupo04.culturarte.services.EventUpdateObserver;
import com.grupo04.culturarte.services.TicketService;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToPermissionService;
import com.grupo04.culturarte.utils.RequestErrorHandler;
import com.grupo04.culturarte.utils.ServiceStatus;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/event")
public class EventController implements EventUpdateObserver {

	@Autowired
	private EventService eventService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserToPermissionService userToPermissionService;

	@Autowired
	private TicketService ticketService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private RequestErrorHandler errorHandler;

	@Override
	public void notifyEventUpdate(Events event) throws Exception{
		// send email
		try {
			List<Ticket> tickets = ticketService.findAllByEventId(event.getEventId());

			String body = "Estimado(a) cliente,\r\n\r\n" +
			        "Le informamos que el evento " + event.getTitle() + " ha sido actualizado.\r\n" +
			        "Puede consultar todos los detalles y la información actualizada en nuestra página web o en su cuenta personal.\r\n\r\n" +
			        "Acceda a su cuenta en: www.culturarte.com\r\n\r\n" +
			        "Si tiene alguna pregunta o requiere más información, no dude en contactarnos.\r\n\r\n" +
			        "¡Gracias por su atención y esperamos que disfrute del evento!\r\n\r\n" +
			        "Atentamente,\r\n" +
			        "El equipo de CulturArte";

			String subject = "Actualizacion del evento" + event.getTitle();

			for (Ticket ticket : tickets) {
				String recipient = ticket.getUser().getUsername();
				EmailDetails email = new EmailDetails(recipient, body, subject);
				emailService.sendEmail(email);
			}
		} catch (Exception e) {
			throw new Exception("Error send emails");
		}

	}

	@GetMapping("/")
	public ResponseEntity<?> getAllEvents(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		Pageable pageable = PageRequest.of(page, size);
		Page<Events> events = eventService.findAllPageable(pageable);

		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	@GetMapping("/{eventId}")
	public ResponseEntity<?> getEventById(@PathVariable UUID eventId) throws Exception {
		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Events event = eventService.findById(eventId);

		if (event == null) {
			return new ResponseEntity<>(new MessageDTO("event not found"), HttpStatus.NOT_FOUND);

		}
		return new ResponseEntity<>(event, HttpStatus.OK);
	}

	@GetMapping("/past")
	public ResponseEntity<?> getPastEvents(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		LocalDate date = LocalDate.now();
		Pageable pageable = PageRequest.of(page, size);
		Page<Events> events = eventService.getPastEvents(pageable, date);

		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	@GetMapping("/upcoming")
	public ResponseEntity<?> getUpcomingEvents(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		LocalDate date = LocalDate.now();
		Pageable pageable = PageRequest.of(page, size);
		Page<Events> events = eventService.getUpcomingEvents(pageable, date);
		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	@GetMapping("/category/{category}")
	public ResponseEntity<?> getEventsByCategory(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @PathVariable String category) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Pageable pageable = PageRequest.of(page, size);
		Page<Events> events = eventService.getEventsByCategory(pageable, category);
		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	@GetMapping("/category/upcoming/{category}")
	public ResponseEntity<?> getUpcomingEventsByCategory(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @PathVariable String category) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Pageable pageable = PageRequest.of(page, size);
		Page<Events> events = eventService.getUpcomingEventsByCategory(pageable, category);
		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	@GetMapping("/category/past/{category}")
	public ResponseEntity<?> getPastEventsByCategory(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @PathVariable String category) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Pageable pageable = PageRequest.of(page, size);
		Page<Events> events = eventService.getPastEventsByCategory(pageable, category);
		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	@PostMapping("/")
	public ResponseEntity<?> saveEvent(@RequestBody @Valid AddEventDTO info, BindingResult validations)
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
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de eventos")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		try {
			eventService.save(info);
			return new ResponseEntity<>(new MessageDTO("Event created!"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{eventId}")
	public ResponseEntity<?> updateEvent(@RequestBody @Valid UpdateEventDTO info, @PathVariable UUID eventId,
			BindingResult validations) throws Exception {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Events event = eventService.findById(eventId);
		if ( event == null) {
			return new ResponseEntity<>(new MessageDTO("Event not found"), HttpStatus.NOT_FOUND);
		} else if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null)
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de eventos")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		try {
			eventService.update(info, eventId);
			notifyEventUpdate(event);
			return new ResponseEntity<>(new MessageDTO("Event updated!"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PatchMapping("/toggle/{eventId}")
	public ResponseEntity<?> toggleEvent(@PathVariable UUID eventId) throws Exception {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Events event = eventService.findById(eventId);

		if (event == null) {
			return new ResponseEntity<>(new MessageDTO("Event not found"), HttpStatus.NOT_FOUND);
		}

		Users userFound = userService.findUserAuthenticated();
		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de eventos")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		try {

			eventService.toogleEvent(eventId);
			return new ResponseEntity<>(new MessageDTO("Event is " + event.getState()), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/popular")
	public ResponseEntity<?> popularPlaceEvent(){
		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);
		
		Users userFound = userService.findUserAuthenticated();
		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("acceso a estadisticas")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}
		
		try {
			List<Map<String, Object>> popularPlaces = eventService.popularPlaceEvent();
			return new ResponseEntity<>(popularPlaces, HttpStatus.OK);
			
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}