package com.example.gestionvisiteur.service;

import com.example.gestionvisiteur.dto.EnregistrementRequest;
import com.example.gestionvisiteur.model.Visiteur;
import com.example.gestionvisiteur.model.Visite;
import com.example.gestionvisiteur.repository.VisiteurRepository;
import com.example.gestionvisiteur.repository.VisiteRepository;
import com.example.gestionvisiteur.model.Journal;
import com.example.gestionvisiteur.model.Utilisateur;
import com.example.gestionvisiteur.repository.JournalRepository;
import com.example.gestionvisiteur.repository.UtilisateurRepository;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class VisiteurService {

    private final VisiteurRepository visiteurRepository;
    private final VisiteRepository visiteRepository;
    private JournalRepository journalRepository;
    private UtilisateurRepository utilisateurRepository;

    public VisiteurService(VisiteurRepository visiteurRepository,
                           VisiteRepository visiteRepository,
                           JournalRepository journalRepository,       // === ADD THIS ===
                           UtilisateurRepository utilisateurRepository) {
        this.visiteurRepository = visiteurRepository;
        this.visiteRepository = visiteRepository;
        this.journalRepository = journalRepository;       // === ADD THIS ===
        this.utilisateurRepository = utilisateurRepository; // === ADD THIS ===
    }


    public List<Visiteur> getAllVisiteurs() {
        return visiteurRepository.findAll();
    }


    public Visiteur enregistrerVisiteur(EnregistrementRequest request) {
        System.out.println("ENREGISTREMENT VISITEUR APPEL");
        System.out.println(request.getVisitePour());
        System.out.println(request.getMotif());


        // 1 - Enregistrer le visiteur
        Visiteur visiteur = new Visiteur();

        visiteur.setNom(request.getNom());
        visiteur.setPrenom(request.getPrenom());
        visiteur.setCin(request.getCin());
        visiteur.setSociete(request.getSociete());

        Visiteur nouveauVisiteur = visiteurRepository.save(visiteur);


        // 2 - Créer la visite liée au visiteur
        Visite visite = new Visite();

        visite.setVisiteur(nouveauVisiteur);
        visite.setPersonneVisite(request.getVisitePour());
        visite.setMotif(request.getMotif());

        visite.setDateVisite(LocalDate.now());
        visite.setHeureDebut(LocalTime.now());
        visite.setHeureFin(null);
        visite.setStatus("PRESENT");


        visiteRepository.save(visite);
        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);
        Journal log = new Journal("Enregistrement visiteur: " + nouveauVisiteur.getNom(), LocalDateTime.now(), actor);
        journalRepository.save(log);

        return nouveauVisiteur;
    }


    public void supprimerVisiteur(Long id) {
        Visiteur v = visiteurRepository.findById(id).orElse(null);
        if (v != null) {
            Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);
            Journal log = new Journal("Suppression visiteur: " + v.getNom(), LocalDateTime.now(), actor);
            journalRepository.save(log);
        }

        visiteurRepository.deleteById(id);
    }


    public Visiteur modifierVisiteur(Long id, Visiteur nouveauVisiteur) {

        Visiteur ancienVisiteur = visiteurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visiteur non trouvé"));

        ancienVisiteur.setNom(nouveauVisiteur.getNom());
        ancienVisiteur.setPrenom(nouveauVisiteur.getPrenom());
        ancienVisiteur.setCin(nouveauVisiteur.getCin());
        ancienVisiteur.setSociete(nouveauVisiteur.getSociete());

        Visiteur updated = visiteurRepository.save(ancienVisiteur);

        // ==========================================
        // === added by med =========================
        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);
        Journal log = new Journal("Modification visiteur: " + updated.getNom(), LocalDateTime.now(), actor);
        journalRepository.save(log);
        // ==========================================

        return updated;
    }
}