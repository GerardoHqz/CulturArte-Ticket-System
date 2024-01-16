package com.grupo04.culturarte.models.entities;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="SPONSORSHIP")
public class Sponsorship {
	
	@Id
	@Column(name="sponsorship_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID sponsorshipId;
	
	@Column(name="name_sponsorship")
	private String nameSponsorship;
	
	@Column(name="logo")
	private UUID logo;
	
	@OneToMany(mappedBy = "sponsorship", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<SponsorToEvent> events;

	public Sponsorship(String nameSponsorship, UUID logo) {
		super();
		this.nameSponsorship = nameSponsorship;
		this.logo = logo;
	}
	
}