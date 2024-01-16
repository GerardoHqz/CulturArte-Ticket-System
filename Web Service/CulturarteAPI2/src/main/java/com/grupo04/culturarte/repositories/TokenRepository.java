package com.grupo04.culturarte.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo04.culturarte.models.entities.Token;
import com.grupo04.culturarte.models.entities.Users;

public interface TokenRepository extends JpaRepository<Token, UUID>{
	List<Token> findByUserAndActive(Users user, Boolean active);
}
