package com.grupo04.culturarte.services.implementations;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.PermissionDTO;
import com.grupo04.culturarte.models.entities.Permission;
import com.grupo04.culturarte.repositories.PermissionRepository;
import com.grupo04.culturarte.services.PermissionService;

import jakarta.transaction.Transactional;

@Service
public class PermissionServiceImp implements PermissionService {

	@Autowired
	PermissionRepository permissionRepository;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(PermissionDTO info) throws Exception {
		Permission permission = new Permission(info.getNamePermission());

		permissionRepository.save(permission);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void deleteById(UUID id) throws Exception {
		permissionRepository.deleteById(id);
	}

	@Override
	public List<Permission> findAll() {
		return permissionRepository.findAll();
	}

	@Override
	public Permission findById(UUID permissionId) {
		List<Permission> permission = permissionRepository.findAll().stream()
				.filter(p -> p.getPermissionId().equals(permissionId)).collect(Collectors.toList());

		if (permission.isEmpty()) {
			return null;
		}

		Permission permissionFind = permission.get(0);

		return permissionFind;
	}

	@Override
	public Permission findByName(String name) {
		List<Permission> permissions = permissionRepository.findAll().stream()
				.filter(p -> p.getNamePermission().equals(name)).collect(Collectors.toList());

		if (permissions.isEmpty()) {
			return null;
		}

		return permissions.get(0);
	}

}
