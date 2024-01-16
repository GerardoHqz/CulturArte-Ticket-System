package com.grupo04.culturarte.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCategoryDTO {

	@NotEmpty(message = "Category can't be empty")
	private String nameCategory;

	@NotEmpty(message = "Color can't be empty")
	private String color;
}
