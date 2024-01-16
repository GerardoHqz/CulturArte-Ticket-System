package com.grupo04.culturarte.services.implementations;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.SponsorToEventDTO;
import com.grupo04.culturarte.models.entities.Events;
import com.grupo04.culturarte.models.entities.SponsorToEvent;
import com.grupo04.culturarte.models.entities.Sponsorship;
import com.grupo04.culturarte.repositories.SponsorToEventRepository;
import com.grupo04.culturarte.services.EventService;
import com.grupo04.culturarte.services.SponsorToEventService;
import com.grupo04.culturarte.services.SponsorshipService;

import jakarta.transaction.Transactional;

@Service
public class SponsorToEventServiceImp implements SponsorToEventService {

	@Autowired
	SponsorToEventRepository sponsorToEventRepository;

	@Autowired
	EventService eventService;

	@Autowired
	SponsorshipService sponsorService;

	@Override
	public List<Sponsorship> findAllByEvent(UUID eventId) {
		List<SponsorToEvent> sponsorToEventList = sponsorToEventRepository.findAll().stream()
				.filter(x -> x.getEvent().getEventId().equals(eventId)).collect(Collectors.toList());

		List<Sponsorship> sponsorList = sponsorToEventList.stream().map(SponsorToEvent::getSponsorship)
				.collect(Collectors.toList());

		return sponsorList;
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(SponsorToEventDTO info) throws Exception {
		try {
			Sponsorship sponsor = sponsorService.findById(info.getSponsorId());
			Events event = eventService.findById(info.getEventId());

			SponsorToEvent sponsorToEvent = new SponsorToEvent(sponsor, event);

			sponsorToEventRepository.save(sponsorToEvent);

		} catch (Exception e) {
			throw new Exception("Save event od a user invalid");
		}

	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void delete(SponsorToEventDTO info) throws Exception {
		List<SponsorToEvent> sponsorToEvent = sponsorToEventRepository.findAll().stream()
				.filter(x -> x.getSponsorship().getSponsorshipId().equals(info.getSponsorId())
						&& x.getEvent().getEventId().equals(info.getEventId()))
				.collect(Collectors.toList());

		if (!sponsorToEvent.isEmpty()) {
			SponsorToEvent sponsorFound = sponsorToEvent.get(0);

			sponsorToEventRepository.delete(sponsorFound);
		}

	}

	@Override
	public List<SponsorToEvent> findAll() {
		return sponsorToEventRepository.findAll();
	}

}
