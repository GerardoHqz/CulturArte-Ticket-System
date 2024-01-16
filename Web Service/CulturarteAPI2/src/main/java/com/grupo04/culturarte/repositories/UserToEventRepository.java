package com.grupo04.culturarte.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo04.culturarte.models.entities.UserToEvent;

public interface UserToEventRepository extends JpaRepository<UserToEvent, UUID> {
}
