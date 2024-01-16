package com.grupo04.culturarte.services;

import java.util.*;

import com.grupo04.culturarte.models.dtos.AddCategoryDTO;
import com.grupo04.culturarte.models.entities.Category;

public interface CategoryService {
	void save(AddCategoryDTO info) throws Exception;
	void deleteByName(String name) throws Exception;
	List<Category> findAll();
    Category findByName(String name);
}
