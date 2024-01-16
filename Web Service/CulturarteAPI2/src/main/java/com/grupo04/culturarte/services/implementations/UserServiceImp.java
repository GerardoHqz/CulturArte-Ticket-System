package com.grupo04.culturarte.services.implementations;

import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.AddUserDTO;
import com.grupo04.culturarte.models.dtos.EmailDTO;
import com.grupo04.culturarte.models.dtos.EmailDetails;
import com.grupo04.culturarte.models.dtos.LoginDTO;
import com.grupo04.culturarte.models.dtos.UpdatePasswordDTO;
import com.grupo04.culturarte.models.dtos.UserNoPassDTO;
import com.grupo04.culturarte.models.dtos.UserToPermissionDTO;
import com.grupo04.culturarte.models.entities.Token;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.repositories.TokenRepository;
import com.grupo04.culturarte.repositories.UserRepository;
import com.grupo04.culturarte.services.EmailService;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToPermissionService;
import com.grupo04.culturarte.utils.JWTTools;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	public PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JWTTools jwtTools;

	@Autowired
	@Lazy
	private UserToPermissionService userToPermissionService;
	
	@Autowired
	private EmailService emailService;

	@Autowired
	private TokenRepository tokenRepository;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public Token registerToken(Users user) throws Exception {
		cleanTokens(user);

		String tokenString = jwtTools.generateToken(user);
		Token token = new Token(tokenString, user);

		tokenRepository.save(token);

		return token;
	}

	@Override
	public Boolean isTokenValid(Users user, String token) {
		try {
			cleanTokens(user);
			List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

			tokens.stream().filter(tk -> tk.getContent().equals(token)).findAny().orElseThrow(() -> new Exception());

			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void cleanTokens(Users user) throws Exception {
		List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

		tokens.forEach(token -> {
			if (!jwtTools.verifyToken(token.getContent())) {
				token.setActive(false);
				tokenRepository.save(token);
			}
		});

	}

	@Override
	public void toggleToken(Users user) {
		List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

		if (!tokens.isEmpty()) {
			Token token = tokens.get(0);
			token.setActive(false);
			tokenRepository.save(token);
		}
	}

	@Override
	public Users findUserAuthenticated() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		return findOneByEmail(username);
	}

	@Override
	public Users getUserFromToken(String info) {
		List<Token> token = tokenRepository.findAll().stream()
				.filter(t -> t.getContent().matches(info) && t.getActive().equals(true)).collect(Collectors.toList());
		Users user = token.get(0).getUser();

		return user;
	}

	@Override
	public Boolean comparePass(String toCompare, String current) {
		return passwordEncoder.matches(toCompare, current);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(AddUserDTO info) throws Exception {
		try {
			Users user = new Users(info.getUsername(), passwordEncoder.encode(info.getPassword()));

			userRepository.save(user);

			// Get id new user
			Users userFound = findOneByEmail(info.getUsername());

			// adding permissions
			UUID permissionTiketsId = UUID.fromString("39a8ab5d-2a35-4ed2-83b9-78161e12e7b1");

			UserToPermissionDTO permission1 = new UserToPermissionDTO(userFound.getUserId(), permissionTiketsId);

			userToPermissionService.save(permission1);

		} catch (Exception e) {
			throw new Exception("Error save user");
		}

	}
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public void saveNoPass(UserNoPassDTO info) throws Exception {
		try {
			Users user = new Users(info.getUsername(), null);

			userRepository.save(user);

			// Get id new user
			Users userFound = findOneByEmail(info.getUsername());

			// adding permissions
			UUID permissionTiketsId = UUID.fromString("39a8ab5d-2a35-4ed2-83b9-78161e12e7b1");

			UserToPermissionDTO permission1 = new UserToPermissionDTO(userFound.getUserId(), permissionTiketsId);

			userToPermissionService.save(permission1);

		} catch (Exception e) {
			throw new Exception("Error save user");
		}

	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void changePassword(UpdatePasswordDTO info) throws Exception {
		Users user = findOneByEmail(info.getEmail());

		if (user == null || !passwordEncoder.matches(info.getOldPassword(), user.getPassword())) {
			throw new Exception("400");
		}
		user.setPassword(passwordEncoder.encode(info.getNewPassword()));
		userRepository.save(user);
	}

	@Override
	public void toogleByEmail(String email) throws Exception {
		Users user = findOneByEmail(email);

		if (user.getState()) {
			user.setState(false);
		} else {
			user.setState(true);
		}

		userRepository.save(user);
	}

	@Override
	public Page<Users> finAdll(Pageable pageable) {
		return userRepository.findAll(pageable);
	}

	@Override
	public Users findOneByEmail(String email) {
		List<Users> user = userRepository.findAll().stream().filter(u -> u.getUsername().equals(email))
				.collect(Collectors.toList());

		if (user.isEmpty()) {
			return null;
		}

		Users userFind = user.get(0);

		return userFind;

	}

	@Override
	public Users findById(UUID userId) throws Exception {
		List<Users> user = userRepository.findAll().stream().filter(u -> u.getUserId().equals(userId))
				.collect(Collectors.toList());

		if (user.size() == 0) {
			throw new Exception("User not found");
		}

		Users userFind = user.get(0);

		return userFind;
	}

	@Override
	public void login(LoginDTO login) throws Exception {
		Users user = findOneByEmail(login.getEmail());

		if (!comparePass(login.getPassword(), user.getPassword())) {
			throw new Exception("Invalid credentials");
		}

		if (!user.getState()) {
			throw new Exception("User inactive");
		}

	}
	
	@Override
	public void loginNoPass(UserNoPassDTO info) throws Exception {
		Users user = findOneByEmail(info.getUsername());
		if (!user.getState()) {
			throw new Exception("User inactive");
		}
	}
	@Override
	public String confirmationRegister(EmailDTO emailUser) throws Exception {
		String code = generateCodeVerification();
		// send email -> user recived transfer
		String body = "Estimado(a) cliente:\n\n"
		        + "Gracias por registrarse en CulturArte. Para verificar su cuenta, utilice el siguiente código de verificación:\n\n"
		        + "Código: " + code + "\n\n"
		        + "Ingrese este código en la página de verificación de cuenta para completar el proceso de registro.\n\n"
		        + "Si no ha solicitado este código o tiene alguna pregunta, por favor contáctenos de inmediato.\n\n"
		        + "¡Gracias por unirse a nuestra comunidad!\n\n"
		        + "Atentamente,\n"
		        + "El equipo de CulturArte";

		String subject = "Activacion de Cuenta";
		String recipient = emailUser.getEmail();

		EmailDetails email = new EmailDetails(recipient, body, subject);
		emailService.sendEmail(email);
		
		return code;
	}
	
	public String  generateCodeVerification() {
		StringBuilder code = new StringBuilder();
		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		int longuitude = 8;

		Random random = new Random();
		for (int i = 0; i < longuitude; i++) {
		    int indice = random.nextInt(characters.length());
		    char caracter = characters.charAt(indice);
		    code.append(caracter);
		}

		String codigoVerificacionString = code.toString();
		
		return codigoVerificacionString;
	}

}
