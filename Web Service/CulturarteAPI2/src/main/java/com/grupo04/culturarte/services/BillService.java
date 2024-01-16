package com.grupo04.culturarte.services;

import java.util.*;

import com.grupo04.culturarte.models.dtos.BillDTO;
import com.grupo04.culturarte.models.entities.Bill;

public interface BillService {
	void save(BillDTO info) throws Exception;
	List<Bill> findAll();
	Bill finOneById(UUID billId);
}
