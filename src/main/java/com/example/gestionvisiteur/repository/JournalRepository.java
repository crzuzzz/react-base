package com.example.gestionvisiteur.repository;

import com.example.gestionvisiteur.model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {
}