package com.grupo04.culturarte.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor 
@NoArgsConstructor
public class AddTierDTO {
	
	@NotEmpty(message = "Tier name can't be empty")
	private String nameTier;
	
	@NotNull(message = "Amount seant can't be empty")
	@Min(value = 1, message = "Duration must be at least 1")
	private int amountSeant;
	
	@NotNull(message = "Price can't be empty")
	@Min(value = 1, message = "Price must be at least 1")
	private float price;
	
	@NotNull(message = "Id event can't be empty")
	private UUID event;
}
