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
public class AddEventDTO {

	@NotEmpty(message = "Place can't be empty")
	@Size(min = 8, message = "Place must have a minimum of 8 characters")
	private String place;

	@NotEmpty(message = "Title can't be empty")
	@Size(min = 5, message = "Title must have a minimum of 5 characters")
	private String title;
	
	@NotEmpty(message = "Description can't be empty")
	@Size(min = 5, message = "Description must have a minimum of 5 characters")
	private String description;

	@NotEmpty(message = "Involved can't be empty")
	@Size(min = 5, message = "Involved must have a minimum of 5 characters")
	private String involved;

	@NotNull(message = "Image can't be empty")
	private UUID image_id;

	@NotNull(message = "Date can't be empty")
	@Future(message = "Date must be in the future")
	private LocalDate date;

	@NotNull(message = "Hour can't be empty")
	private LocalTime hour;

	@NotNull(message = "State can't be empty")
	private Boolean state;

	@NotNull(message = "Duration can't be empty")
	@Min(value = 1, message = "Duration must be at least 1")
	private int duration;

	@NotEmpty(message = "Category can't be empty")
	private String category;

}
