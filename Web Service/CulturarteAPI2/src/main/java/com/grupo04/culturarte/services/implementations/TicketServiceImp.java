package com.grupo04.culturarte.services.implementations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.PurchaseTicketDTO;
import com.grupo04.culturarte.models.dtos.UpdateTicketDTO;
import com.grupo04.culturarte.models.entities.Bill;
import com.grupo04.culturarte.models.entities.Events;
import com.grupo04.culturarte.models.entities.Ticket;
import com.grupo04.culturarte.models.entities.Tier;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.repositories.BillRepository;
import com.grupo04.culturarte.repositories.TicketRepository;
import com.grupo04.culturarte.services.BillService;
import com.grupo04.culturarte.services.EventService;
import com.grupo04.culturarte.services.TicketService;
import com.grupo04.culturarte.services.TierService;
import com.grupo04.culturarte.services.UserService;

import jakarta.transaction.Transactional;

@Service
public class TicketServiceImp implements TicketService {

	@Autowired
	TicketRepository ticketRepository;

	@Autowired
	EventService eventService;

	@Autowired
	UserService userService;

	@Autowired
	TierService tierService;

	@Autowired
	BillService billService;

	@Autowired
	BillRepository billRepository;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(PurchaseTicketDTO info) throws Exception {
		Users user = userService.findById(info.getUser());
		Events event = eventService.findById(info.getEvent());
		Tier tier = tierService.findById(info.getTier());

		int ammount = info.getAmmount();

		if (tier.getAmountSeant() == 0)
			throw new Exception("Sold out!");

		if (tier.getAmountSeant() - ammount < 0)
			throw new Exception("Not enough");

		for (int i = 0; i < ammount; i++) {
			try {
				Ticket ticket = new Ticket(tier.getNameTier() + "-" + tier.getAmountSeant(), info.getDate(),
						info.getHour(), info.getRedmed(), tier, user, event);
				Bill bill = new Bill(tier.getNameTier() + tier.getAmountSeant(), info.getDate(), info.getHour(),
						info.getRedmed(), tier, user, event);

				billRepository.save(bill);
				tier.setAmountSeant(tier.getAmountSeant() - 1);
				ticketRepository.save(ticket);

			} catch (Exception e) {
				throw new Exception("Error save ticket");
			}
		}
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void delete(UUID ticketId) throws Exception {
		try {
			ticketRepository.deleteById(ticketId);
		} catch (Exception e) {
			throw new Exception("Ticket not found");
		}
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void update(UpdateTicketDTO info) throws Exception {

		try {
			Ticket ticket = findById(info.getTicketId());
			Users user = userService.findById(info.getUserDestinataryId());

			ticket.setUser(user);

			ticketRepository.save(ticket);
			
		} catch (Exception e) {
			throw new Exception("Ticket can't update");
		}

	}

	@Override
	public List<Ticket> findAll() {
		return ticketRepository.findAll();
	}

	@Override
	public Page<Ticket> findAllPageable(Pageable pageable) {
		return ticketRepository.findAll(pageable);
	}

	@Override
	public Page<Ticket> finAllTicketsByUser(Pageable pageable, UUID userId) {
		return ticketRepository.findAllByUserUserId(pageable, userId);

	}

	@Override
	public Page<Ticket> findtPastTicketsByUser(Pageable pageable, UUID userId, LocalDate clientDateTime) {
		Page<Ticket> tickets = ticketRepository.findAllByUserUserIdAndRedmed(pageable, userId, false);
		List<Ticket> pastTickets = new ArrayList<>();

		for (Ticket ticket : tickets) {
			LocalDate eventDate = ticket.getEvent().getDate();

			if (eventDate.compareTo(clientDateTime) <= 0)
				pastTickets.add(ticket);
		}
		return new PageImpl<>(pastTickets, pageable, tickets.getTotalElements());
	}

	@Override
	public Page<Ticket> findUpcomingTicketsByUser(Pageable pageable, UUID userId, LocalDate clientDateTime) {
		Page<Ticket> tickets = ticketRepository.findAllByUserUserIdAndRedmed(pageable, userId, true);
		List<Ticket> upcomingTickets = new ArrayList<>();

		for (Ticket ticket : tickets) {
			LocalDate eventDate = ticket.getEvent().getDate();

			if (eventDate.compareTo(clientDateTime) <= 0)
				upcomingTickets.add(ticket);
		}
		return new PageImpl<>(upcomingTickets, pageable, tickets.getTotalElements());
	}

	@Override
	public List<Ticket> findAllByEventId(UUID eventId) throws Exception {
		Events event = eventService.findById(eventId);
		List<Ticket> tickets = new ArrayList<>();

		for (Ticket ticket : findAll()) {
			if (ticket.getEvent().equals(event)) {
				tickets.add(ticket);
			}
		}

		return tickets;
	}

	@Override
	public Ticket findById(UUID ticketId) {
		List<Ticket> ticket = ticketRepository.findAll().stream().filter(t -> t.getTicketId().equals(ticketId))
				.collect(Collectors.toList());

		if (ticket.isEmpty()) {
			return null;
		}

		Ticket ticketFind = ticket.get(0);

		return ticketFind;
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void redeemTicket(UUID ticketId) {
		Ticket ticket = findById(ticketId);

		if (ticket.getRedmed()) {
			ticket.setRedmed(false);
		} else {
			ticket.setRedmed(true);
		}

		ticketRepository.save(ticket);
	}
	
	@Override
	public List<Ticket> getAllTicketsByEventId(UUID eventId) {
        List<Ticket> tickets = ticketRepository.findAll();
        return tickets.stream()
                .filter(ticket -> ticket.getEvent().getEventId().equals(eventId))
                .collect(Collectors.toList());
    }

}
