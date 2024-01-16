package com.grupo04.culturarte.services.implementations;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.AddTierDTO;
import com.grupo04.culturarte.models.entities.Events;
import com.grupo04.culturarte.models.entities.Tier;
import com.grupo04.culturarte.repositories.TierRepository;
import com.grupo04.culturarte.services.EventService;
import com.grupo04.culturarte.services.TierService;

import jakarta.transaction.Transactional;

@Service
public class TierServiceImp implements TierService {

	@Autowired
	TierRepository tierRepository;

	@Autowired
	EventService eventService;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(AddTierDTO info) throws Exception {
		Events event = eventService.findById(info.getEvent());

		Tier tier = new Tier(info.getNameTier(), info.getAmountSeant(), info.getPrice(), event);

		tierRepository.save(tier);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void update(AddTierDTO info, UUID tierId) throws Exception {
		Tier tier = findById(tierId);
		Events event = eventService.findById(info.getEvent());

		tier.setNameTier(info.getNameTier());
		tier.setAmountSeant(info.getAmountSeant());
		tier.setPrice(info.getPrice());
		tier.setEvent(event);

		tierRepository.save(tier);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void delete(UUID tierId) throws Exception {
		tierRepository.deleteById(tierId);
	}

	@Override
	public List<Tier> findAll() {
		return tierRepository.findAll();
	}

	@Override
	public List<Tier> getTierByEventId(UUID eventId) {
		return tierRepository.findByEventEventId(eventId);
	}

	@Override
	public Tier findById(UUID tierId) {
		List<Tier> tier = tierRepository.findAll().stream().filter(t -> t.getTierId().equals(tierId))
				.collect(Collectors.toList());

		if (tier.isEmpty()) {
			return null;
		}

		Tier tierFind = tier.get(0);

		return tierFind;
	}

}