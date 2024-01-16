package com.grupo04.culturarte.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo04.culturarte.models.entities.QRCode;

public interface QRCodeRepository extends JpaRepository<QRCode, UUID>{
	QRCode findQRCodeById(UUID id);
}
