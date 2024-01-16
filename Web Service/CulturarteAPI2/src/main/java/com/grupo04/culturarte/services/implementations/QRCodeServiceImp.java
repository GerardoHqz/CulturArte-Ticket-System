package com.grupo04.culturarte.services.implementations;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.QRCodeDTO;
import com.grupo04.culturarte.models.entities.QRCode;
import com.grupo04.culturarte.models.entities.Ticket;
import com.grupo04.culturarte.repositories.QRCodeRepository;
import com.grupo04.culturarte.services.QRCodeService;
import com.grupo04.culturarte.services.TicketService;

@Service
public class QRCodeServiceImp implements QRCodeService{

	@Autowired
	QRCodeRepository QRcodeRepository;
	
	@Autowired
	TicketService ticketService;

	@Override
	public UUID save(QRCodeDTO info) throws Exception {
		
		Ticket ticket = ticketService.findById(info.getTicket_id());
		Timestamp date = new Timestamp(System.currentTimeMillis());
		QRCode qr = new QRCode(
					date,
					info.getActive(),
					ticket
				);
		
		QRcodeRepository.save(qr);
		return qr.getId();
		
	}

	@Override
	public void update(QRCodeDTO info, UUID id) throws Exception {
		QRCode qr = QRcodeRepository.findQRCodeById(id);
		
		qr.setActive(info.getActive());
		
		QRcodeRepository.save(qr);		
	}

	@Override
	public QRCode findById(UUID id) {
		return QRcodeRepository.findQRCodeById(id);
	}

	
	
}
