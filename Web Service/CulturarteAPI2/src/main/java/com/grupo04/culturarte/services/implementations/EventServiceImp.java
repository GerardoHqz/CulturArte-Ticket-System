package com.grupo04.culturarte.services.implementations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.AddEventDTO;
import com.grupo04.culturarte.models.dtos.UpdateEventDTO;
import com.grupo04.culturarte.models.entities.Category;
import com.grupo04.culturarte.models.entities.Events;
import com.grupo04.culturarte.models.entities.Image;
import com.grupo04.culturarte.repositories.CategoryRepository;
import com.grupo04.culturarte.repositories.EventRepository;
import com.grupo04.culturarte.services.EventService;
import com.grupo04.culturarte.services.EventUpdateObserver;
import com.grupo04.culturarte.services.ImageService;

import jakarta.transaction.Transactional;

@Service
public class EventServiceImp implements EventService {

	@Autowired
	EventRepository eventRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	ImageService imageService;

	private List<EventUpdateObserver> observers = new ArrayList<>();
	
	// Método para registrar observadores
    public void registerObserver(EventUpdateObserver observer) {
        observers.add(observer);
    }

    // Método para notificar a los observadores
    public void notifyEventUpdate(Events event) throws Exception{
        for (EventUpdateObserver observer : observers) {
            observer.notifyEventUpdate(event);
        }
    }

	@Override
	public List<Events> findAll() {
		return eventRepository.findAll();
	}

	@Override
	public Events findById(UUID event) throws Exception {
		List<Events> events = eventRepository.findAll().stream().filter(e -> e.getEventId().equals(event))
				.collect(Collectors.toList());

		if (events.size() == 0) {
			throw new Exception("Event not found");
		}

		Events eventFind = events.get(0);

		return eventFind;
	}

	@Override
	public Page<Events> getPastEvents(Pageable pageable, LocalDate clientDateTime) {
		Page<Events> allEvents = eventRepository.findAll(pageable);
		List<Events> pastEvents = new ArrayList<>();

		for (Events event : allEvents) {
			LocalDate eventDate = event.getDate();

			if (eventDate.compareTo(clientDateTime) < 0)
				pastEvents.add(event);
		}

		 return new PageImpl<>(pastEvents, pageable, allEvents.getTotalElements());
	}

	@Override
	public Page<Events> getUpcomingEvents(Pageable pageable, LocalDate clientDateTime) {
		Page<Events> allEvents = eventRepository.findAll(pageable);
		List<Events> upcomingEvents = new ArrayList<>();

		for (Events event : allEvents) {
			LocalDate eventDate = event.getDate();
			if (eventDate.compareTo(clientDateTime) >= 0)
				upcomingEvents.add(event);
		}

		 return new PageImpl<>(upcomingEvents, pageable, allEvents.getTotalElements());
	}

	@Override
	public Page<Events> getEventsByCategory(Pageable pageable, String category) {
		Page<Events> events = eventRepository.findByCategoryName(category, pageable);
	    return events;
	}

	@Override
	public Page<Events> getUpcomingEventsByCategory(Pageable pageable, String category) {
		LocalDate date = LocalDate.now();
		List<Events> events = getUpcomingEvents(pageable,date).stream().filter(e -> e.getCategory().getName().equals(category))
				.collect(Collectors.toList());

		int pageSize = pageable.getPageSize();
	    int currentPage = pageable.getPageNumber();
	    int startItem = currentPage * pageSize;
		
	    List<Events> sublist;
	    if (events.size() < startItem) {
	        sublist = Collections.emptyList();
	    } else {
	        int toIndex = Math.min(startItem + pageSize, events.size());
	        sublist = events.subList(startItem, toIndex);
	    }

	    return new PageImpl<>(sublist, pageable, events.size());
	}

	@Override
	public Page<Events> getPastEventsByCategory(Pageable pageable, String category) {
		LocalDate date = LocalDate.now();
		List<Events> events = getPastEvents(pageable,date).stream().filter(e -> e.getCategory().getName().equals(category))
				.collect(Collectors.toList());

		int pageSize = pageable.getPageSize();
	    int currentPage = pageable.getPageNumber();
	    int startItem = currentPage * pageSize;
		
	    List<Events> sublist;
	    if (events.size() < startItem) {
	        sublist = Collections.emptyList();
	    } else {
	        int toIndex = Math.min(startItem + pageSize, events.size());
	        sublist = events.subList(startItem, toIndex);
	    }

	    return new PageImpl<>(sublist, pageable, events.size());
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(AddEventDTO info) throws Exception {

		Category category = categoryRepository.findByName(info.getCategory());

		Image image = imageService.findById(info.getImage_id());
		if (image == null) {
			throw new Exception("Image not found");
		}

		Events event = new Events(info.getPlace(), info.getTitle(), info.getDescription(), info.getInvolved(), image, info.getDate(),
				info.getHour(), info.getDuration(), info.getState(), category);

		eventRepository.save(event);

	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void update(UpdateEventDTO info, UUID eventId) throws Exception {
		Events event = findById(eventId);

		if (event == null)
			throw new Exception("Event not found");

		if(info.getPlace() != null) event.setPlace(info.getPlace());
		if(info.getTitle() != null) event.setTitle(info.getTitle());
		if(info.getDescription() != null) event.setDescription(info.getDescription());
		if(info.getInvolved() != null) event.setInvolved(info.getInvolved());
		if(info.getImage_id() != null) event.setImage(imageService.findById(info.getImage_id()));
		if(info.getDate() != null) event.setDate(info.getDate());
		if(info.getHour() != null) event.setHour(info.getHour());
		event.setState(info.getState());
		if(info.getCategory() != null) event.setCategory(categoryRepository.findByName(info.getCategory()));

		eventRepository.save(event);
		notifyEventUpdate(event);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void toogleEvent(UUID eventId) throws Exception {
		Events event = findById(eventId);

		if (event.getState()) {
			event.setState(false);
		} else {
			event.setState(true);
		}

		eventRepository.save(event);
	}

	@Override
	public Page<Events> findAllPageable(Pageable pageable) {
		return eventRepository.findAll(pageable);
	}

	@Override
	public List<Map<String, Object>> popularPlaceEvent() {
	    List<Events> events = eventRepository.findAll();

	    // Crear un mapa para realizar el conteo de lugares
	    Map<String, Integer> placeCounts = new HashMap<>();

	    // Contar la frecuencia de cada lugar
	    for (Events event : events) {
	        String place = event.getPlace();
	        placeCounts.put(place, placeCounts.getOrDefault(place, 0) + 1);
	    }

	    // Ordenar los lugares por frecuencia de mayor a menor
	    List<Map.Entry<String, Integer>> sortedPlaces = new ArrayList<>(placeCounts.entrySet());
	    sortedPlaces.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

	    // Obtener los lugares más comunes con su frecuencia
	    List<Map<String, Object>> popularPlaces = new ArrayList<>();
	    int count = Math.min(sortedPlaces.size(), 3);
	    for (int i = 0; i < count; i++) {
	        Map<String, Object> placeData = new HashMap<>();
	        placeData.put("place", sortedPlaces.get(i).getKey());
	        placeData.put("count", sortedPlaces.get(i).getValue());
	        popularPlaces.add(placeData);
	    }

	    return popularPlaces;
	}

	

}
