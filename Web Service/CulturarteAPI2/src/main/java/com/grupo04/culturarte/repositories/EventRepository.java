package com.grupo04.culturarte.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.grupo04.culturarte.models.entities.Events;

public interface EventRepository extends JpaRepository<Events, UUID>, PagingAndSortingRepository<Events, UUID> {
	Page<Events> findByCategoryName(String categoryName, Pageable pageable);
}
