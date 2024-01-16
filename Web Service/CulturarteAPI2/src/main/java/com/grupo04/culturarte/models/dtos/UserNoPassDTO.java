package com.grupo04.culturarte.models.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserNoPassDTO {
	
	@NotEmpty(message = "email can't be empty")
	@Email(message = "Invalid email format")
	private String username;
	
}
