package com.grupo04.culturarte.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddSponsorshipDTO {

	@NotEmpty(message = "Sponsorship name can't be empty")
	@Size(min = 4, message = "Sponsorship name must have a minimum of 8 characters")
	private String nameSponsorship;

	@NotNull(message = "Logo can't be empty")
	private UUID logo;
}
