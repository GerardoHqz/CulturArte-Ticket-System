package com.grupo04.culturarte.models.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="BILL")
public class Bill {
	
	@Id
	@Column(name="bill_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID billId;
	
	@Column(name="seat")
	private String seat;
	
	@Column(name="date")
	private LocalDate date;
	
	@Column(name="hour")
	private LocalTime hour;
	
	@Column(name="redmed")
	private Boolean redmed;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "tier_id", nullable = true)
	private Tier tier;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = true)
	private Users user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "event_id", nullable = true)
	private Events event;

	public Bill(String seat, LocalDate date, LocalTime hour,Boolean redmed, Tier tier, Users user,
			Events event) {
		super();
		this.seat = seat;
		this.date = date;
		this.hour = hour;
		this.redmed = redmed;
		this.tier = tier;
		this.user = user;
		this.event = event;
	}
	
}
