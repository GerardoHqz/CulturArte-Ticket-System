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
import com.grupo04.culturarte.models.dtos.UserToPermissionDTO;
import com.grupo04.culturarte.models.entities.Permission;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.models.entities.UserToPermission;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToPermissionService;
import com.grupo04.culturarte.utils.RequestErrorHandler;
import com.grupo04.culturarte.utils.ServiceStatus;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user-permission")
public class UserToPermissionController {
	@Autowired
	private UserToPermissionService userToPermissionService;

	@Autowired
	private UserService userService;

	@Autowired
	private RequestErrorHandler errorHandler;

	@PostMapping("/")
	public ResponseEntity<?> saveUserToPermission(@RequestBody @Valid UserToPermissionDTO info,
			BindingResult validations) throws Exception {

		if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null)
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de permisos")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		try {
			userToPermissionService.save(info);
			return new ResponseEntity<>(new MessageDTO("Adding permission of user OK!"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/")
	public ResponseEntity<?> deleteUserToPermission(@RequestBody @Valid UserToPermissionDTO info,
			BindingResult validations) throws Exception {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de permisos")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		try {

			userToPermissionService.delete(info);
			return new ResponseEntity<>(new MessageDTO("Permission in user is deleted"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/")
	public ResponseEntity<?> getAllUserToPermission() {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de permisos")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}

		List<UserToPermission> userToPermissionList = userToPermissionService.findAll();
		return new ResponseEntity<>(userToPermissionList, HttpStatus.OK);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<?> getPermissionByUser(@PathVariable UUID userId) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<Permission> permissions = userToPermissionService.getPermissionByUser(userId);

		if (permissions == null) {
			return new ResponseEntity<>(new MessageDTO("User not found"), HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<>(permissions, HttpStatus.OK);
	}

	@GetMapping("/user-by-permission/{permissionId}")
	public ResponseEntity<?> getUsersWithEmployeePermission(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @PathVariable UUID permissionId) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<UserToPermission> user = userToPermissionService.findAll().stream()
				.filter(u -> u.getPermission().getNamePermission().equals("gestion de permisos")
						&& u.getUser().getUsername().equals(userFound.getUsername()))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return new ResponseEntity<>(new MessageDTO("User not have permission for this service"),
					HttpStatus.BAD_REQUEST);
		}
		
		Pageable pageable = PageRequest.of(page, size);
		Page<Users> users = userToPermissionService.getUsersWithEmployeePermission(pageable, permissionId);

		if (users == null) {
			return new ResponseEntity<>(new MessageDTO("Permission not found"), HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<>(users, HttpStatus.OK);

	}
}
