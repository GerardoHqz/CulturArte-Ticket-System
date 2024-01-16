package com.grupo04.culturarte.services.implementations;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.BillDTO;
import com.grupo04.culturarte.models.entities.Bill;
import com.grupo04.culturarte.models.entities.Events;
import com.grupo04.culturarte.models.entities.Tier;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.repositories.BillRepository;
import com.grupo04.culturarte.services.BillService;
import com.grupo04.culturarte.services.EventService;
import com.grupo04.culturarte.services.TierService;
import com.grupo04.culturarte.services.UserService;

import jakarta.transaction.Transactional;

@Service
public class BillServiceImp implements BillService {

	@Autowired
	BillRepository billRepository;

	@Autowired
	EventService eventService;

	@Autowired
	UserService userService;

	@Autowired
	TierService tierService;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(BillDTO info) throws Exception {
		Users user = userService.findById(info.getUser());
		Events event = eventService.findById(info.getEvent());
		Tier tier = tierService.findById(info.getTier());

		try {
			Bill bill = new Bill(info.getSeat(), info.getDate(), info.getHour(), info.getRedmed(), tier, user, event);

			billRepository.save(bill);

		} catch (Exception e) {
			throw new Exception("Error save ticket");
		}

	}

	@Override
	public List<Bill> findAll() {
		return billRepository.findAll();
	}

	@Override
	public Bill finOneById(UUID billId) {
		List<Bill> bill = billRepository.findAll().stream()
				.filter(b -> b.getBillId() != null && b.getBillId().equals(billId)).collect(Collectors.toList());

		if (bill.isEmpty()) {
			return null;
		}

		Bill billFind = bill.get(0);

		return billFind;
	}

}
