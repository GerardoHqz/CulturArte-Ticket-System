package com.grupo04.culturarte.services;

import com.grupo04.culturarte.models.entities.Events;

public interface EventUpdateObserver {
	void notifyEventUpdate(Events event) throws Exception;
}
