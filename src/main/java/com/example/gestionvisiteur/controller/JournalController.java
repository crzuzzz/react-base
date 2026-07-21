package com.example.gestionvisiteur.controller;

import com.example.gestionvisiteur.model.Journal;
import com.example.gestionvisiteur.repository.JournalRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*") // Fixes CORS blocking for React
public class JournalController {

    private final JournalRepository journalRepository;

    public JournalController(JournalRepository journalRepository) {
        this.journalRepository = journalRepository;
    }

    @GetMapping
    public List<Journal> getAllLogs() {
        return journalRepository.findAll();
    }
}