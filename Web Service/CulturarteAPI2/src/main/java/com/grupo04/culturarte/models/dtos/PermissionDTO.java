package com.grupo04.culturarte.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermissionDTO {
	
	@NotEmpty(message = "name permission can't be empty")
	private String namePermission; 
	
}
