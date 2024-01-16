package com.grupo04.culturarte.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo04.culturarte.models.entities.Bill;

public interface BillRepository extends JpaRepository<Bill, UUID>{

}
