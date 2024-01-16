package com.grupo04.culturarte.models.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="EVENTS")
public class Events {
	
	@Id
	@Column(name="event_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID eventId;
	
	@Column(name="place")
	private String place;
	
	@Column(name="title")
	private String title;
	
	@Column(name="description")
	private String description;
	
	@Column(name="involved")
	private String involved;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "image_id")
	private Image image;
	
	@Column(name="date")
	private LocalDate date;
	
	@Column(name="hour")
	private LocalTime hour;
	
	@Column(name="duration")
	private int duration;
	
	@Column(name="state")
	private Boolean state;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id", nullable = true)
	private Category category;
	
	@OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<UserToEvent> users;
	
	@OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<SponsorToEvent> sponsors;

	public Events(String place, String title, String description, String involved, Image image, LocalDate date, LocalTime hour,
			int duration, Boolean state, Category category) {
		super();
		this.place = place;
		this.title = title;
		this.description = description;
		this.involved = involved;
		this.image = image;
		this.date = date;
		this.hour = hour;
		this.duration = duration;
		this.state = state;
		this.category = category;
	}
	
}

