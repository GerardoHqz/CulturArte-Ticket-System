package com.grupo04.culturarte.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.grupo04.culturarte.models.entities.Users;

public interface UserRepository extends JpaRepository<Users, UUID>, PagingAndSortingRepository<Users, UUID>{
}
