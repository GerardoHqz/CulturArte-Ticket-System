package com.grupo04.culturarte.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo04.culturarte.models.entities.Tier;

public interface TierRepository extends JpaRepository<Tier, UUID> {
	List<Tier> findByEventEventId(UUID eventId);
}
