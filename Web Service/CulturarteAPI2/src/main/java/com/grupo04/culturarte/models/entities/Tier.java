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
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="TIER")
public class Tier {
	
	@Id
	@Column(name="tier_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID tierId;
	
	@Column(name="name_tier")
	private String nameTier;
	
	@Column(name="amount_seant")
	private int amountSeant;
	
	@Column(name="amount_seant_original")
	private int amountSeantOriginal;
		
	@Column(name="price")
	private float price;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "event_id", nullable = true)
	private Events event;

	public Tier(String nameTier, int amountSeant, float price, Events event) {
		super();
		this.nameTier = nameTier;
		this.amountSeant = amountSeant;
		this.price = price;
		this.event = event;
	}
	
	@PrePersist
	protected void setAmountSeantOriginal() {
		this.amountSeantOriginal = this.amountSeant;
	}
	
	
}
