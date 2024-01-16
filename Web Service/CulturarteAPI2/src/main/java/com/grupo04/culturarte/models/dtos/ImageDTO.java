package com.grupo04.culturarte.models.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageDTO {

	@NotNull(message = "Active can't be empty")
	private String path;

	@NotNull(message = "Ticket Id can't be empty")
	private String name;
	
}