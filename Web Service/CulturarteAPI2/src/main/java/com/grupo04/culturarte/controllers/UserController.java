package com.grupo04.culturarte.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo04.culturarte.models.dtos.MessageDTO;
import com.grupo04.culturarte.models.entities.UserToPermission;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToPermissionService;
import com.grupo04.culturarte.utils.ServiceStatus;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private UserToPermissionService userToPermissionService;

	@GetMapping("/")
	public ResponseEntity<?> getAllUsers(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("consultar usuarios")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}
		
		Pageable pageable = PageRequest.of(page, size);
		Page<Users> users = userService.finAdll(pageable);
		return new ResponseEntity<>(users, HttpStatus.OK);
	}


	@PutMapping("/toggle/{email}")
	public ResponseEntity<?> toggleUserByEmail(@PathVariable String email) throws Exception {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findOneByEmail(email);
		Users userAdmin = userService.findUserAuthenticated();

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("desactivar/activar usuarios")
						&& u.getUser().getUsername().equals(userAdmin.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not found"), HttpStatus.NOT_FOUND);
		}

		try {

			userService.toogleByEmail(email);
			return new ResponseEntity<>(new MessageDTO("User is " + userFound.getState()), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}