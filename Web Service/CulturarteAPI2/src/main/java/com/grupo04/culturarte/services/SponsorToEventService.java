package com.grupo04.culturarte.services;

import java.util.*;

import com.grupo04.culturarte.models.dtos.SponsorToEventDTO;
import com.grupo04.culturarte.models.entities.SponsorToEvent;
import com.grupo04.culturarte.models.entities.Sponsorship;

public interface SponsorToEventService {
	void save(SponsorToEventDTO info) throws Exception;
	void delete(SponsorToEventDTO info) throws Exception;
	List<SponsorToEvent> findAll();
	List<Sponsorship> findAllByEvent(UUID eventId);
}
