package com.grupo04.culturarte.models.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="USERXPERMISSIONS")
public class UserToPermission {
	@Id
	@Column(name="userxpermission_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID userxpermissionId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = true)
	private Users user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "permission_id", nullable = true)
	private Permission permission;

	public UserToPermission(Users user, Permission permission) {
		super();
		this.user = user;
		this.permission = permission;
	}
	
}
