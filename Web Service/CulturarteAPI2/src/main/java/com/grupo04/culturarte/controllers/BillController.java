package com.grupo04.culturarte.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo04.culturarte.models.dtos.BillDTO;
import com.grupo04.culturarte.models.dtos.MessageDTO;
import com.grupo04.culturarte.models.entities.Bill;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.services.BillService;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.utils.RequestErrorHandler;
import com.grupo04.culturarte.utils.ServiceStatus;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bill")
public class BillController {
	@Autowired
	private BillService billService;

	@Autowired
	private UserService userService;

	@Autowired
	private RequestErrorHandler errorHandler;

	@PostMapping("/")
	public ResponseEntity<?> saveBill(@RequestBody @Valid BillDTO info, BindingResult validations)
			throws Exception {

		if (validations.hasErrors()) {
			return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null)
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

		try {
			billService.save(info);
			return new ResponseEntity<>(new MessageDTO("Bill created!"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/")
	public ResponseEntity<?> getAllBills() {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		List<Bill> bills = billService.findAll();
		return new ResponseEntity<>(bills, HttpStatus.OK);

	}

	@GetMapping("/{billId}")
	public ResponseEntity<?> getBillById(@PathVariable UUID billId) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Users userFound = userService.findUserAuthenticated();
		if (userFound == null) {
			return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
		}

		Bill bill = billService.finOneById(billId);

		if (bill == null) {
			return new ResponseEntity<>(new MessageDTO("Bill not found"), HttpStatus.NOT_FOUND);

		}

		return new ResponseEntity<>(bill, HttpStatus.OK);

	}

}
