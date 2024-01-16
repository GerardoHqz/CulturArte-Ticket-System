package com.grupo04.culturarte.controllers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo04.culturarte.models.dtos.AddUserDTO;
import com.grupo04.culturarte.models.dtos.EmailDTO;
import com.grupo04.culturarte.models.dtos.LoginDTO;
import com.grupo04.culturarte.models.dtos.MessageDTO;
import com.grupo04.culturarte.models.dtos.TokenDTO;
import com.grupo04.culturarte.models.dtos.UpdatePasswordDTO;
import com.grupo04.culturarte.models.dtos.UserNoPassDTO;
import com.grupo04.culturarte.models.entities.Token;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.repositories.UserRepository;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.utils.RequestErrorHandler;
import com.grupo04.culturarte.utils.ServiceStatus;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RequestErrorHandler errorHandler;

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody @Valid LoginDTO info, BindingResult validations) throws Exception {
		if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users user = userService.findOneByEmail(info.getEmail());
		if (user == null)
			return new ResponseEntity<>(new MessageDTO("User not found"), HttpStatus.UNAUTHORIZED);

		try {
			userService.login(info);
			Token token = userService.registerToken(user);
			return new ResponseEntity<>(new TokenDTO(token), HttpStatus.OK);

		} catch (Exception e) {
			if (e.getMessage().equals("Invalid credentials")) {
				return new ResponseEntity<>(new MessageDTO(e.getMessage()), HttpStatus.UNAUTHORIZED);
			} else if (e.getMessage().equals("User inactive")) {
				return new ResponseEntity<>(new MessageDTO(e.getMessage()), HttpStatus.CONFLICT);
			} else {
				e.printStackTrace();
				return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
	
	@PostMapping("/googleAuth")
	public ResponseEntity<?> googleAuth(@RequestBody @Valid UserNoPassDTO info, BindingResult validations) throws Exception {
		if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);
		
		Users user = userService.findOneByEmail(info.getUsername());
		
		try {
			if(user == null) {
				return new ResponseEntity<>(null, HttpStatus.OK);
			} else {
				userService.loginNoPass(info);
				Token token = userService.registerToken(user);
				return new ResponseEntity<>(new TokenDTO(token), HttpStatus.OK);
			}

		} catch (Exception e) {
			if (e.getMessage().equals("User inactive")) {
				return new ResponseEntity<>(new MessageDTO(e.getMessage()), HttpStatus.CONFLICT);
			}
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> saveUser(@RequestBody @Valid AddUserDTO info, BindingResult validations) throws Exception {
		if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		List<Users> allUsers = userRepository.findAll();
		List<String> allUsersUsername = allUsers.stream().map(u -> u.getUsername()).collect(Collectors.toList());
		if (allUsersUsername.contains(info.getUsername()))
			return new ResponseEntity<>(new MessageDTO("User already exists"), HttpStatus.CONFLICT);

		try {
			userService.save(info);
			return new ResponseEntity<>(new MessageDTO("user created!"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

	@PostMapping("/change-password")
	public ResponseEntity<?> changePassword(@RequestBody @Valid UpdatePasswordDTO info, BindingResult validations)
			throws Exception {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		if (userService.findOneByEmail(info.getEmail()) == null) {
			return new ResponseEntity<>(new MessageDTO("User not found"), HttpStatus.NOT_FOUND);
		} else if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		try {
			userService.changePassword(info);
			return new ResponseEntity<>(new MessageDTO("password update!"), HttpStatus.OK);

		} catch (Exception e) {
			if (e.getMessage().equals("400")) {
				return new ResponseEntity<>(new MessageDTO("Wrong password"), HttpStatus.BAD_REQUEST);
			} else {
				e.printStackTrace();
				return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
			}

		}

	}

	@PatchMapping("/logout")
	public ResponseEntity<?> logout() {
		Users userFound = userService.findUserAuthenticated();

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		if (userService.findOneByEmail(userFound.getUsername()) == null)
			return new ResponseEntity<>(new MessageDTO("User not found"), HttpStatus.NOT_FOUND);

		try {
			userService.toggleToken(userFound);
			return new ResponseEntity<>(new MessageDTO("bye"), HttpStatus.OK);
		} catch (Exception e) {

			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping("/verification-account")
	public ResponseEntity<?> enviarCorreo(@RequestBody EmailDTO info) {
		try {
			String code = userService.confirmationRegister(info);
			return new ResponseEntity<>(code, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/by-email/{email}")
	public ResponseEntity<?> getUserByEmail(@PathVariable String email) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findOneByEmail(email);
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("user not found"), HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<>(userFound, HttpStatus.OK);

	}

	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserById(@PathVariable UUID userId) throws Exception {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findById(userId);
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("user not found"), HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<>(userFound, HttpStatus.OK);
	}
	
	@GetMapping("/token/{info}")
	public ResponseEntity<?> getUserByToken(@PathVariable String info) throws Exception {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.getUserFromToken(info);
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("user not found"), HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<>(userFound.getUserId(), HttpStatus.OK);
	}

}
