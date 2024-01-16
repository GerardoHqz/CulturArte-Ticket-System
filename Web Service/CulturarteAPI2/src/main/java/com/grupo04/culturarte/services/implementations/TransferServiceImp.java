package com.grupo04.culturarte.services.implementations;

import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.EmailDetails;
import com.grupo04.culturarte.models.dtos.TransferDTO;
import com.grupo04.culturarte.models.dtos.UpdateTicketDTO;
import com.grupo04.culturarte.models.entities.Ticket;
import com.grupo04.culturarte.models.entities.Transfer;
import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.repositories.TransferRepository;
import com.grupo04.culturarte.services.EmailService;
import com.grupo04.culturarte.services.TicketService;
import com.grupo04.culturarte.services.TransferService;
import com.grupo04.culturarte.services.UserService;

import jakarta.transaction.Transactional;

@Service
public class TransferServiceImp implements TransferService {

	@Autowired
	TransferRepository transferRepository;

	@Autowired
	TicketService ticketService;

	@Autowired
	UserService userService;

	@Autowired
	EmailService emailService;
	
	public String  generateCodeVerification() {
		StringBuilder code = new StringBuilder();
		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		int longuitude = 8;

		Random random = new Random();
		for (int i = 0; i < longuitude; i++) {
		    int indice = random.nextInt(characters.length());
		    char caracter = characters.charAt(indice);
		    code.append(caracter);
		}

		String codigoVerificacionString = code.toString();
		
		return codigoVerificacionString;
	}
	
	@Override
	public String verifyTransfer(TransferDTO info) throws Exception {
		String code = generateCodeVerification();
		Ticket ticket = ticketService.findById(info.getTicketId());
		Users user = ticket.getUser();
		String userToTransfer = info.getUserId();
		// send email -> user recived transfer
		String body = "Estimado(a) cliente:\n\n"
		        + "Para transferir su ticket: \n%s\n" 
				+ "ID: " + ticket.getTicketId() + "\n%s\n"
		        + "Evento: " + ticket.getEvent().getTitle() + "\n%s\n"
				+ "Tier: " + ticket.getTier().getNameTier() + "\n%s\n"
		        + "Precio: " + ticket.getTier().getPrice() + "\n%s\n"
				+ "Fecha: " + ticket.getEvent().getDate().getDayOfMonth() + "/" + ticket.getEvent().getDate().getMonthValue() + "/" 
				+ ticket.getEvent().getDate().getYear() + "\n%s\n" 
		        + "Hora: " + ticket.getEvent().getHour().getHour() + ":" + ticket.getEvent().getHour().getMinute() + "\n%s\n"
				+ "Lugar: " + ticket.getEvent().getPlace() + "\n%s\n"
				+ "A la cuenta: \n%s\n"
				+ userToTransfer + "\n%s\n"
		        +"Utilice el siguiente código de verificación:\n%s\n"
		        + "Código: " + code + "\n%s\n"
		        + "Si no ha solicitado este código o tiene alguna pregunta, por favor contáctenos de inmediato.\n%s\n"
		        + "Atentamente,\n"
		        + "El equipo de CulturArte";

		String subject = "Verificacion de transferencia de ticket";
		String recipient = user.getUsername();

		EmailDetails email = new EmailDetails(recipient, body, subject);
		emailService.sendEmail(email);
		
		return code;
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(TransferDTO info) throws Exception {
		try {
			Ticket ticket = ticketService.findById(info.getTicketId());
			Users user = userService.findOneByEmail(info.getUserId());
			Transfer transfer = new Transfer(ticket, user);

			String emailUser = ticket.getUser().getUsername();

			UpdateTicketDTO updateTicket = new UpdateTicketDTO(info.getTicketId(), user.getUserId());
			
			transferRepository.save(transfer);
			ticketService.update(updateTicket);

			// send email -> user recived transfer
			String body = "Estimado(a) cliente:\r\n" +
			        "Nos complace informarle que se ha realizado una transferencia de ticket exitosa para el evento " +
			        ticket.getEvent().getTitle() + ". " + "Ahora puede disfrutar del evento con su nuevo ticket.\r\n" +
			        "Para obtener más detalles y acceder a su ticket actualizado, le recomendamos consultar la información del evento en nuestra página web o en su cuenta personal.\r\n" +
			        "Acceda a su cuenta en: www.culturarte.com \r\n" +
			        "Si tiene alguna pregunta o requiere más información, no dude en contactarnos.\r\n" +
			        "¡Gracias por su atención y esperamos que disfrute del evento!\r\n" +
			        "Atentamente,\n" +
			        "El equipo de CulturArte";


			String subject = "Tranferencia de Ticket";
			String recipient = ticket.getUser().getUsername();

			EmailDetails email = new EmailDetails(recipient, body, subject);
			emailService.sendEmail(email);

			// send email -> user realize transfer
			body = "Estimado(a) cliente:\n\n"
					+ "Nos complace informarle que se ha realizado una transferencia de ticket exitosa para el evento "
					+ ticket.getEvent().getTitle() + ". \n\n"
					+ "Para obtener más detalles sobre la transferencia realziada, le recomendamos consultar la información de las transferencias de tickets en nuestra página web o en su cuenta personal.\n\n"
					+ "Acceda a su cuenta en: www.culturarte.com \n\n"
					+ "Si tiene alguna pregunta o requiere más información, no dude en contactarnos.\n\n"
					+ "¡Gracias por su atención y esperamos que disfrute del evento!\n\n" + "Atentamente,\n"
					+ "El equipo de CulturArte";

			subject = "Tranferencia de Ticket";
			recipient = emailUser;

			email = new EmailDetails(recipient, body, subject);

			emailService.sendEmail(email);
		} catch (Exception e) {
			throw new Exception("Transfer invalid");
		}

	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void update(TransferDTO info, UUID transferId) throws Exception {

		Transfer transfer = findById(transferId);
		Ticket ticket = ticketService.findById(info.getTicketId());
		Users user = userService.findOneByEmail(info.getUserId());

		if (transfer == null)
			throw new Exception("Event not found");

		transfer.setTicketId(ticket);
		transfer.setUserId(user);

		transferRepository.save(transfer);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void deleteById(UUID id) throws Exception {
		transferRepository.deleteById(id);
	}

	@Override
	public List<Transfer> findAll() {
		return transferRepository.findAll();
	}

	// get all transfer of a user
	@Override
	public List<Transfer> findAllUser(UUID userId) {

		List<Transfer> transfers = transferRepository.findAll().stream()
				.filter(t -> t.getTicketId().getUser().getUserId().equals(userId)).collect(Collectors.toList());

		return transfers;
	}

	@Override
	public Transfer findById(UUID id) {
		List<Transfer> transfers = transferRepository.findAll().stream().filter(t -> t.getTransferId().equals(id))
				.collect(Collectors.toList());

		if (transfers.isEmpty()) {
			return null;
		}

		Transfer transferFind = transfers.get(0);

		return transferFind;
	}

}
