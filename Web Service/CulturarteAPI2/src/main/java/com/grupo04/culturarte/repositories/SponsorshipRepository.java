package com.grupo04.culturarte.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo04.culturarte.models.entities.Sponsorship;

public interface SponsorshipRepository extends JpaRepository<Sponsorship, UUID> {
	
}
