package com.example.gestionvisiteur.service;

import com.example.gestionvisiteur.model.Journal;
import com.example.gestionvisiteur.model.Utilisateur;
import com.example.gestionvisiteur.repository.JournalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class JournalService {

    private final JournalRepository journalRepository;

    // Constructor injection for dependency management
    public JournalService(JournalRepository journalRepository) {
        this.journalRepository = journalRepository;
    }

    /**
     * Creates and saves a log entry to the JOURNAL table.
     *
     * @param actionDescription Text describing the operation (e.g., "Added visitor: John Doe")
     * @param actor             The user who performed the action
     */
    @Transactional
    public void logAction(String actionDescription, Utilisateur actor) {
        if (actor == null) {
            // Skips logging or handles gracefully if no authenticated user session is active
            return;
        }

        // Build the log entity using the constructor you created
        Journal log = new Journal(
                actionDescription,
                LocalDateTime.now(),
                actor
        );

        // Save into the database
        journalRepository.save(log);
    }
}
