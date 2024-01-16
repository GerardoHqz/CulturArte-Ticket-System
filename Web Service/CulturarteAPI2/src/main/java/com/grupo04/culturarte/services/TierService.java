package com.grupo04.culturarte.services;

import java.util.*;

import com.grupo04.culturarte.models.dtos.AddTierDTO;
import com.grupo04.culturarte.models.entities.Tier;

public interface TierService {
	void save(AddTierDTO info) throws Exception; 
	void update(AddTierDTO info,UUID tierId) throws Exception; 
    void delete(UUID tierId) throws Exception;
    List<Tier> findAll();
    List<Tier> getTierByEventId(UUID eventId);
	Tier findById(UUID eventId);
}
