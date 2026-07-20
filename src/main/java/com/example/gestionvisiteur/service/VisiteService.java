package com.example.gestionvisiteur.service;

// === added by med ===
import com.example.gestionvisiteur.model.Journal;
import com.example.gestionvisiteur.model.Utilisateur;
import com.example.gestionvisiteur.repository.JournalRepository;
import com.example.gestionvisiteur.repository.UtilisateurRepository;
import java.time.LocalDateTime;
// === added by med ===

import com.example.gestionvisiteur.model.Visite;
import com.example.gestionvisiteur.repository.VisiteRepository;
import org.springframework.stereotype.Service;
import java.time.LocalTime;

import java.util.List;

@Service
public class VisiteService {

    private final VisiteRepository visiteRepository;
    // === added by med ===
    private JournalRepository journalRepository;
    private UtilisateurRepository utilisateurRepository;
    // === added by med ===

    // added by med
    public VisiteService(VisiteRepository visiteRepository,
                         JournalRepository journalRepository,       //added by med
                         UtilisateurRepository utilisateurRepository) { //added by med
        this.visiteRepository = visiteRepository;
        this.journalRepository = journalRepository;       //added by med
        this.utilisateurRepository = utilisateurRepository; //added by med
    }

    
    // ajouter une visite
    public Visite ajouterVisite(Visite visite) {
        Visite savedVisite = visiteRepository.save(visite);

        // ==========================================
        // === added by med =====================
        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);
        Journal log = new Journal("Ajout visite pour: " + savedVisite.getPersonneVisite(), LocalDateTime.now(), actor);
        journalRepository.save(log);
        // ==========================================

        return savedVisite;
    }

    // afficher toutes les visites
    public List<Visite> getAllVisites() {
        return visiteRepository.findAll();
    }


    public Visite enregistrerSortie(Long idVisite) {
        Visite visite = visiteRepository.findById(idVisite)
                .orElseThrow(() -> new RuntimeException("Visite non trouvée"));

        visite.setHeureFin(LocalTime.now());
        visite.setStatus("SORTI");

        Visite savedVisite = visiteRepository.save(visite);

        // ==========================================
        // === added by med =========================
        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);
        Journal log = new Journal("Sortie enregistrée pour visite ID: " + savedVisite.getIdVisite(), LocalDateTime.now(), actor);
        journalRepository.save(log);
        // ==========================================

        return savedVisite;
    }
}