package com.grupo04.culturarte.controllers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import com.grupo04.culturarte.models.dtos.MessageDTO;
import com.grupo04.culturarte.models.entities.Image;
import com.grupo04.culturarte.models.entities.UserToPermission;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.services.ImageService;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToPermissionService;
import com.grupo04.culturarte.utils.ServiceStatus;

@RestController
@RequestMapping("/image")
public class ImageController {

	@Autowired
	private ImageService imageService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserToPermissionService userToPermissionService;

	@PostMapping("/")
	public ResponseEntity<?> saveImage(@RequestParam("file") MultipartFile file)
			throws Exception {


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
			UUID imageId = imageService.save(file);
			return new ResponseEntity<>(imageId,
					HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteImage(@PathVariable UUID id) {

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
			imageService.delete(id);
			return ResponseEntity.ok("Image deleted successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete image");
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getImageById(@PathVariable UUID id) {

		if (!ServiceStatus.isServiceUp())
			return new ResponseEntity<>(new MessageDTO("Service is inactive"), HttpStatus.BAD_REQUEST);

		Image image = imageService.findById(id);

		if (image != null) {
			Resource resource = imageService.getImage(image.getName());
			return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
		} else {
			return new ResponseEntity<>(new MessageDTO("image not found"), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/name/{name}")
	public ResponseEntity<?> getImageByName(@PathVariable String name) {

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

		Image image = imageService.findByName(name);
		if (image != null) {
			Resource resource = imageService.getImage(image.getName());
			return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
		} else {
			return new ResponseEntity<>(new MessageDTO("image not found"), HttpStatus.NOT_FOUND);
		}
	}
}