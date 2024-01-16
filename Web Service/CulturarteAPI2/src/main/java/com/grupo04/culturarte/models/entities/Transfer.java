package com.grupo04.culturarte.models.entities;

import java.sql.Timestamp;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="TRANSFER")
public class Transfer {
	
	@Id
	@Column(name="transfer_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID transferId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ticket_id", nullable = true)
	private Ticket ticketId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = true)
	private Users userId;
	
	@Column(name = "date_transfer")
	private Timestamp dateTransfer;

	public Transfer(Ticket ticketId, Users userId) {
		super();
		this.ticketId = ticketId;
		this.userId = userId;
	}
	
	@PrePersist
	private void prePersist() {
		dateTransfer = new Timestamp(System.currentTimeMillis());
	}
}

