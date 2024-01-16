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
@Table(name = "PERMISSIONS")
public class Permission {
	@Id
	@Column(name = "permission_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID permissionId;

	@Column(name = "name_permission")
	private String namePermission;

	public Permission(String namePermission) {
		super();
		this.namePermission = namePermission;
	}
}
