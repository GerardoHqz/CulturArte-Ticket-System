package com.grupo04.culturarte.controllers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo04.culturarte.models.dtos.MessageDTO;
import com.grupo04.culturarte.models.dtos.QRCodeDTO;
import com.grupo04.culturarte.models.entities.QRCode;
import com.grupo04.culturarte.models.entities.UserToPermission;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.services.QRCodeService;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToPermissionService;
import com.grupo04.culturarte.utils.ServiceStatus;

@RestController
@RequestMapping("/qrcode")
public class QRCodeController {

    @Autowired
    private QRCodeService qrcodeService;
    
    @Autowired
	private UserService userService;

	@Autowired
	private UserToPermissionService userToPermissionService;

    @PostMapping("/")
    public ResponseEntity<?> createQRCode(@RequestBody QRCodeDTO info) {
        
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
    	
    	try {
            UUID qrId = qrcodeService.save(info);
            return new ResponseEntity<>(qrId, HttpStatus.OK);
        } catch (Exception e) {
        	return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateQRCode(@RequestBody QRCodeDTO info, @PathVariable UUID id) {
        
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
    	
    	try {
            qrcodeService.update(info, id);
            return new ResponseEntity<>(new MessageDTO("QR code updated!"), HttpStatus.OK);
        } catch (Exception e) {
        	return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQRCodeById(@PathVariable UUID id) {
        
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
		try {
			QRCode qrCode = qrcodeService.findById(id);
	    	if (qrCode == null) {
	        	return new ResponseEntity<>(new MessageDTO("QR not found"), HttpStatus.BAD_REQUEST);
	        }
	        
	        if (qrCode != null) {
	        	return new ResponseEntity<>(qrCode, HttpStatus.OK);
	        } 
		} catch (Exception e) {
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}