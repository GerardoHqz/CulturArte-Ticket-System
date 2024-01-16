package com.grupo04.culturarte.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.AddCategoryDTO;
import com.grupo04.culturarte.models.entities.Category;
import com.grupo04.culturarte.repositories.CategoryRepository;
import com.grupo04.culturarte.services.CategoryService;

import jakarta.transaction.Transactional;

@Service
public class CategoryServiceImp implements CategoryService {

	@Autowired
	CategoryRepository categoryRepository;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(AddCategoryDTO info) throws Exception {
		Category category = new Category(info.getNameCategory(), info.getColor());

		categoryRepository.save(category);

	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void deleteByName(String name) throws Exception {
		Category category = categoryRepository.findByName(name);

		if (category == null) {
			throw new Exception("Category not found");
		}

		categoryRepository.delete(category);
	}

	@Override
	public List<Category> findAll() {
		return categoryRepository.findAll();
	}

	@Override
	public Category findByName(String name) {
		return categoryRepository.findByName(name);
	}

}
