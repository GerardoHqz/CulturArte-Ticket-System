package com.grupo04.culturarte.models.entities;

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
@Table(name="SPONSORSHIPXEVENT")
public class SponsorToEvent {
	
	@Id
	@Column(name="sponsorshipxevent_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "sponsorship_id", nullable = true)
	private Sponsorship sponsorship;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "event_id", nullable = true)
	private Events event;

	public SponsorToEvent(Sponsorship sponsorship, Events event) {
		super();
		this.sponsorship = sponsorship;
		this.event = event;
	}
	
}
