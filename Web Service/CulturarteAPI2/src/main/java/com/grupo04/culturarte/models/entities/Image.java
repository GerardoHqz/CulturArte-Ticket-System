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
@Table(name = "IMAGE")
public class Image {
	
	@Id
	@Column(name="image_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	
	@Column(name="path")
	private String path;
	
	@Column(name="name")
	private String name;

	public Image(String path, String name) {
		super();
		this.path = path;
		this.name = name;
	}
	
}
