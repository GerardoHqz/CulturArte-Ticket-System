package com.grupo04.culturarte.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo04.culturarte.models.entities.Image;

public interface ImageRepository extends JpaRepository<Image, UUID> {
	Image findImageById(UUID id);

	Image findImageByName(String name);
}
