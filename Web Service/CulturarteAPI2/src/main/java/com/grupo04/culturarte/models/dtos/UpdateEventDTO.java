package com.grupo04.culturarte.models.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEventDTO {

	private String place;

	private String title;
	
	private String description;

	private String involved;

	private UUID image_id;

	private LocalDate date;

	private LocalTime hour;

	private Boolean state;

	private String category;

}
