package com.grupo04.culturarte.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QRCodeDTO {

	@NotNull(message = "Active can't be empty")
	private Boolean active;

	@NotNull(message = "Ticket Id can't be empty")
	private UUID ticket_id;
	
}
