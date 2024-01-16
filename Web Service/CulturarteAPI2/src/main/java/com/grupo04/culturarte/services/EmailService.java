package com.grupo04.culturarte.services;

import com.grupo04.culturarte.models.dtos.EmailDetails;

public interface EmailService {
	void sendEmail(EmailDetails details) throws Exception;
}
