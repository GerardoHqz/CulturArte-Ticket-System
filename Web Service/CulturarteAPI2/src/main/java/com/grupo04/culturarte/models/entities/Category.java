package com.grupo04.culturarte.models.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="CATEGORY")
public class Category {
	
	@Id
	@Column(name="category_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID categoryId;
	
	@Column(name="name_category")
	private String name;
	
	@Column(name="color")
	private String color;

	public Category(String name, String color) {
		super();
		this.name = name;
		this.color = color;
	}
	
}
