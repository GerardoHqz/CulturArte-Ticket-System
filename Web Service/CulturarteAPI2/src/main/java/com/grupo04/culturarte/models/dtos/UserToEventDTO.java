package com.grupo04.culturarte.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserToEventDTO {
	@NotNull(message = "User id can't be empty")
	private UUID userId;
	
	@NotNull(message = "Event id can't be empty")
	private UUID eventId;
}
