package com.grupo04.culturarte.services;

import java.util.*;

import com.grupo04.culturarte.models.dtos.AddSponsorshipDTO;
import com.grupo04.culturarte.models.entities.Sponsorship;

public interface SponsorshipService {
	void save(AddSponsorshipDTO info) throws Exception;
	void update(AddSponsorshipDTO info, UUID sponsorId) throws Exception;
    void delete(UUID sponsorshipId) throws Exception;
	List<Sponsorship> findAll();
    Sponsorship findById(UUID sponsorId);
}
