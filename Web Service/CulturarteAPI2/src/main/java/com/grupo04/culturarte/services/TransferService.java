package com.grupo04.culturarte.services;

import java.util.*;

import com.grupo04.culturarte.models.dtos.TransferDTO;
import com.grupo04.culturarte.models.entities.Transfer;

public interface TransferService {
	String verifyTransfer(TransferDTO info) throws Exception;
	void save(TransferDTO info) throws Exception;
	void update(TransferDTO info,UUID transferId) throws Exception;
	void deleteById(UUID id) throws Exception;
	List<Transfer> findAll();
	List<Transfer> findAllUser(UUID userId);
	Transfer findById(UUID id);
}
