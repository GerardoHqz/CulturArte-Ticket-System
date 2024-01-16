package com.grupo04.culturarte.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SponsorToEventDTO {
	@NotNull(message = "Sponsor id can't be empty")
	private UUID sponsorId;
	
	@NotNull(message = "Event id can't be empty")
	private UUID eventId;
}
