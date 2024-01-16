package com.grupo04.culturarte.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.grupo04.culturarte.models.entities.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, UUID>, PagingAndSortingRepository<Ticket, UUID> {
	Page<Ticket> findAllByUserUserId( Pageable pageable, UUID userId);
	Page<Ticket> findAllByUserUserIdAndRedmed(Pageable pageable, UUID userId, boolean redmed);
}
