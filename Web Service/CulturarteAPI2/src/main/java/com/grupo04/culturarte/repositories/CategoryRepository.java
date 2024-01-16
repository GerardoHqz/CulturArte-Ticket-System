package com.grupo04.culturarte.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo04.culturarte.models.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, UUID>{
	void deleteByName(String name) throws Exception;
	Category findByName(String name);
}
