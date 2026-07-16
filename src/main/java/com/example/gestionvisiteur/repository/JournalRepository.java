package com.example.gestionvisiteur.repository;

import com.example.gestionvisiteur.model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalRepository extends JpaRepository<Journal, Long> {

}