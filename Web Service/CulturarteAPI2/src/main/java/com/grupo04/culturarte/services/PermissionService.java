package com.grupo04.culturarte.services;

import java.util.*;

import com.grupo04.culturarte.models.dtos.PermissionDTO;
import com.grupo04.culturarte.models.entities.Permission;

public interface PermissionService {
	void save(PermissionDTO info) throws Exception;
	void deleteById(UUID id) throws Exception;
	List<Permission> findAll();
    Permission findById(UUID permissionId);
    Permission findByName(String permission);
}