package com.grupo04.culturarte.services.implementations;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.UserToPermissionDTO;
import com.grupo04.culturarte.models.entities.Permission;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.models.entities.UserToPermission;
import com.grupo04.culturarte.repositories.UserToPermissionRepository;
import com.grupo04.culturarte.services.PermissionService;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.services.UserToPermissionService;

import jakarta.transaction.Transactional;

@Service
public class UserToPermissionServiceImp implements UserToPermissionService {

	@Autowired
	UserToPermissionRepository userToPermissionRepository;

	@Autowired
	@Lazy
	UserService userService;

	@Autowired
	PermissionService permissionService;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(UserToPermissionDTO info) throws Exception {
		try {
			Users user = userService.findById(info.getUserId());
			Permission permission = permissionService.findById(info.getPermissionId());

			UserToPermission userToPermission = new UserToPermission(user, permission);

			userToPermissionRepository.save(userToPermission);

		} catch (Exception e) {
			throw new Exception("Save permission of user invalid");
		}

	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void delete(UserToPermissionDTO info) throws Exception {
		List<UserToPermission> userToPermission = userToPermissionRepository.findAll().stream()
				.filter(x -> x.getPermission().getPermissionId().equals(info.getPermissionId())
						&& x.getUser().getUserId().equals(info.getUserId()))
				.collect(Collectors.toList());

		if (!userToPermission.isEmpty()) {
			UserToPermission userFound = userToPermission.get(0);

			userToPermissionRepository.delete(userFound);
		}

	}

	// get all permission of a user
	@Override
	public List<Permission> getPermissionByUser(UUID userId) {
		List<UserToPermission> userToPermissionList = userToPermissionRepository.findAll().stream()
				.filter(x -> x.getUser().getUserId().equals(userId)).collect(Collectors.toList());

		List<Permission> permissionList = userToPermissionList.stream().map(UserToPermission::getPermission)
				.collect(Collectors.toList());

		return permissionList;
	}

	@Override
	public List<UserToPermission> findAll() {
		return userToPermissionRepository.findAll();
	}

	// get all users with a specific permission
	@Override
	public Page<Users> getUsersWithEmployeePermission(Pageable pageable, UUID permissionId) {
		List<UserToPermission> userToPermissionList = userToPermissionRepository.findAll()
	            .stream()
	            .filter(x -> x.getPermission().getPermissionId().equals(permissionId))
	            .collect(Collectors.toList());

	    List<Users> userList = userToPermissionList
	            .stream()
	            .map(UserToPermission::getUser)
	            .collect(Collectors.toList());

	    return new PageImpl<>(userList, pageable, userList.size());
	}

}