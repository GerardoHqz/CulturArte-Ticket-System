package com.grupo04.culturarte.services;

import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.grupo04.culturarte.models.dtos.LoginDTO;
import com.grupo04.culturarte.models.entities.Token;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.models.dtos.AddUserDTO;
import com.grupo04.culturarte.models.dtos.EmailDTO;
import com.grupo04.culturarte.models.dtos.UpdatePasswordDTO;
import com.grupo04.culturarte.models.dtos.UserNoPassDTO;

public interface UserService {
	void save(AddUserDTO info) throws Exception;
	void changePassword(UpdatePasswordDTO info) throws Exception;
	void toogleByEmail(String email) throws Exception;
	Page<Users> finAdll(Pageable pageable);
	Users findOneByEmail(String email);
	Users findById(UUID userId) throws Exception;
	void login(LoginDTO login) throws Exception;
	String confirmationRegister(EmailDTO email) throws Exception;
	
	//Token management
	Token registerToken(Users user) throws Exception;
	Boolean isTokenValid(Users user, String token);
	void cleanTokens(Users user) throws Exception;
	Users getUserFromToken (String info);
	Boolean comparePass(String toCompare, String current);
	void toggleToken(Users user);
	
	//Find User authenticated
	Users findUserAuthenticated();
	
	//Google
	public void saveNoPass(UserNoPassDTO info) throws Exception;
	public void loginNoPass(UserNoPassDTO info) throws Exception;
		
}
