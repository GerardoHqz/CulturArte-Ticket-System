package com.grupo04.culturarte.services;

import java.time.LocalDate;
import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.grupo04.culturarte.models.dtos.PurchaseTicketDTO;
import com.grupo04.culturarte.models.dtos.UpdateTicketDTO;
import com.grupo04.culturarte.models.entities.Ticket;

public interface TicketService {
	void save(PurchaseTicketDTO info) throws Exception;
	void delete(UUID ticketId) throws Exception;
	void update(UpdateTicketDTO info) throws Exception;
	List<Ticket> findAll();
	Page<Ticket> findAllPageable(Pageable pageable);
    Page<Ticket> finAllTicketsByUser(Pageable pageable, UUID userId);
    Page<Ticket> findtPastTicketsByUser(Pageable pageable, UUID userId, LocalDate clientDateTime);
    Page<Ticket> findUpcomingTicketsByUser(Pageable pageable, UUID userId, LocalDate clientDateTime);
    List<Ticket> findAllByEventId(UUID eventId) throws Exception;
    List<Ticket> getAllTicketsByEventId(UUID eventId);
    Ticket findById(UUID ticketId);
    void redeemTicket(UUID ticketId);
}
