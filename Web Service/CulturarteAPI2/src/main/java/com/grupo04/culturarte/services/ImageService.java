package com.grupo04.culturarte.services;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import com.grupo04.culturarte.models.entities.Image;

public interface ImageService {
	UUID save(MultipartFile info) throws Exception;

	void delete(UUID id) throws Exception;

	Image findById(UUID id);
	
	Image findByName(String name);
	
	Resource getImage(String name);
}
