package com.grupo04.culturarte.models.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor 
@NoArgsConstructor
public class PurchaseTicketDTO {
	
	@NotNull(message = "Date can't be empty")
	private LocalDate date;
	
	@NotNull(message = "Hour can't be empty")
	private LocalTime hour;
	
	@NotNull(message = "Redmed can't be empty")
	private Boolean redmed;
	
	@NotNull(message = "Tier id can't be empty")
	private UUID tier;
	
	@NotNull(message = "User ud can't be empty")
	private UUID user;
	
	@NotNull(message = "Event id can't be empty")
	private UUID event;
	
	@NotNull(message = "Ammount can't be empty")
	@Min(value = 1, message = "Ammount must be at least one")
	@Positive(message = "Ammount can't be negative")
	private int ammount;
}
