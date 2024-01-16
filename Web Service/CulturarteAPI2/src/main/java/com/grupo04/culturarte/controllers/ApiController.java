package com.grupo04.culturarte.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo04.culturarte.models.dtos.MessageDTO;
import com.grupo04.culturarte.models.entities.UserToPermission;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToPermissionService;
import com.grupo04.culturarte.utils.ServiceStatus;

@RestController
@RequestMapping("/service-toggle")
public class ApiController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserToPermissionService userToPermissionService;

	@PatchMapping("/")
	public ResponseEntity<?> getAllCategories() {

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("desactivar/activar API")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		if (ServiceStatus.isServiceUp()) {
			ServiceStatus.setServiceUp(false);
			return new ResponseEntity<>(new MessageDTO("Service is down"), HttpStatus.OK);
		} else {
			ServiceStatus.setServiceUp(true);
			return new ResponseEntity<>(new MessageDTO("Service is up"), HttpStatus.OK);
		}

	}
}
