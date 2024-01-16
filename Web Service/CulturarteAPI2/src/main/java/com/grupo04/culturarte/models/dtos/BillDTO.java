package com.grupo04.culturarte.models.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor 
@NoArgsConstructor
public class BillDTO {
	
	@NotEmpty(message = "Seat can't be empty")
	private String seat;
	
	@NotNull(message = "Date can't be empty")
	@Future(message = "Date must be in the future")
	private LocalDate date;
	
	@NotNull(message = "Hour can't be empty")
	@Future(message = "Date must be in the future")
	private LocalTime hour;
	
	@NotNull(message = "redmed can't be empty")
	private Boolean redmed;
	
	@NotNull(message = "Tier name can't be empty")
	private UUID tier;
	
	@NotNull(message = "User name can't be empty")
	private UUID user;
	
	@NotNull(message = "Event name can't be empty")
	private UUID event;
}
