package com.grupo04.culturarte.services;

import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.grupo04.culturarte.models.dtos.UserToPermissionDTO;
import com.grupo04.culturarte.models.entities.Permission;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.models.entities.UserToPermission;

public interface UserToPermissionService {
	void save(UserToPermissionDTO info) throws Exception;
	void delete(UserToPermissionDTO info) throws Exception;
	List<UserToPermission> findAll();
	List<Permission> getPermissionByUser(UUID userId);  //Get all permission from user
	Page<Users> getUsersWithEmployeePermission(Pageable pageable, UUID permissionId); //get all user with permission of employee
}
