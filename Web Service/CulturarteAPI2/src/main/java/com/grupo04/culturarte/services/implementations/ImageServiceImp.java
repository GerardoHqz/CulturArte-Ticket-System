package com.grupo04.culturarte.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import com.grupo04.culturarte.models.entities.Image;
import com.grupo04.culturarte.repositories.ImageRepository;
import com.grupo04.culturarte.services.ImageService;

@Service
public class ImageServiceImp implements ImageService {
	@Autowired
	ImageRepository imageRepository;

	@Value("${upload.directory}")
	private String uploadDirectory;

	@Override
	public UUID save(MultipartFile info) throws Exception {
		// Generar un nombre único para la imagen
		String imageName = UUID.randomUUID().toString() + "_" + info.getOriginalFilename();

		// Guardar la imagen en el directorio de carga
		Path imagePath = Paths.get(uploadDirectory).resolve(imageName).normalize();
		Files.copy(info.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

		// Crear una nueva entidad Image y guardarla en la base de datos
		Image image = new Image(imagePath.toString(), imageName);
		imageRepository.save(image);
		UUID imageId = image.getId();
		return imageId;
	}

	@Override
	public void delete(UUID id) throws Exception {
		Image image = imageRepository.findImageById(id);

		imageRepository.delete(image);
	}

	@Override
	public Image findById(UUID id) {
		return imageRepository.findImageById(id);
	}

	@Override
	public Image findByName(String name) {
		return imageRepository.findImageByName(name);
	}

	@Override
	public Resource getImage(String name) {
		try {
			Path imagePath = Paths.get(uploadDirectory).resolve(name).normalize();
			Resource resource = new UrlResource(imagePath.toUri());

			if (resource.exists() && resource.isReadable()) {
				return resource;
			} else {
				throw new RuntimeException("No se pudo encontrar la imagen " + imagePath);
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("Error al cargar la imagen", e);
		}
	}

}
