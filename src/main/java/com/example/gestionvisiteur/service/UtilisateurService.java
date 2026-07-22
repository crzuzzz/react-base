package com.example.gestionvisiteur.service;

import com.example.gestionvisiteur.model.Journal;
import com.example.gestionvisiteur.model.Utulisateur;
import com.example.gestionvisiteur.repository.JournalRepository;
import com.example.gestionvisiteur.repository.UtulisateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UtulisateurService {

    private final UtulisateurRepository utulisateurRepository;
    private final JournalRepository journalRepository;

    public UtulisateurService(
            UtulisateurRepository utulisateurRepository,
            JournalRepository journalRepository
    ) {
        this.utulisateurRepository = utulisateurRepository;
        this.journalRepository = journalRepository;
    }

    // ajouter un utulisateur
    public Utulisateur ajouterUtulisateur(Utulisateur utulisateur) {

        Utulisateur savedUtulisateur = utulisateurRepository.save(utulisateur);

        Utulisateur actor = utulisateurRepository.findById(1L).orElse(null);

        Journal log = new Journal(
                "Ajout de l'utulisateur ID: " + savedUtulisateur.getIdUser() + " (" + savedUtulisateur.getEmail() + ")",
                LocalDateTime.now(),
                actor
        );

        journalRepository.save(log);

        return savedUtulisateur;
    }

    // afficher tous les utulisateurs
    @Transactional(readOnly = true)
    public List<Utulisateur> getAllUtulisateurs() {

        List<Utulisateur> utulisateurs = utulisateurRepository.findAll();

        System.out.println("Repository = " + utulisateurs.size());

        return utulisateurs;
    }

    // obtenir un utulisateur par ID
    @Transactional(readOnly = true)
    public Utulisateur getUtulisateurById(Long id) {
        return utulisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utulisateur non trouvé"));
    }

    // modifier un utulisateur
    @Transactional
    public Utulisateur modifierUtulisateur(Long id, Utulisateur nouvelUtulisateur) {

        Utulisateur utulisateur = utulisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utulisateur non trouvé"));

        utulisateur.setNom(nouvelUtulisateur.getNom());
        utulisateur.setPrenom(nouvelUtulisateur.getPrenom());
        utulisateur.setEmail(nouvelUtulisateur.getEmail());
        utulisateur.setIdRole(nouvelUtulisateur.getIdRole());

        if (nouvelUtulisateur.getMotDePass() != null && !nouvelUtulisateur.getMotDePass().trim().isEmpty()) {
            utulisateur.setMotDePass(nouvelUtulisateur.getMotDePass());
        }

        Utulisateur savedUtulisateur = utulisateurRepository.save(utulisateur);

        Utulisateur actor = utulisateurRepository.findById(1L).orElse(null);

        Journal log = new Journal(
                "Modification de l'utulisateur ID: " + savedUtulisateur.getIdUser(),
                LocalDateTime.now(),
                actor
        );

        journalRepository.save(log);

        return savedUtulisateur;
    }

    // supprimer un utulisateur
    @Transactional
    public void supprimerUtulisateur(Long id) {

        Utulisateur utulisateur = utulisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utulisateur non trouvé"));

        Utulisateur actor = utulisateurRepository.findById(1L).orElse(null);

        Journal log = new Journal(
                "Suppression de l'utulisateur ID: " + utulisateur.getIdUser() + " (" + utulisateur.getEmail() + ")",
                LocalDateTime.now(),
                actor
        );

        journalRepository.save(log);

        utulisateurRepository.delete(utulisateur);
    }
}