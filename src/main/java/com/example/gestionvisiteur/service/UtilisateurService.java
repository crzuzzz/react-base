package com.example.gestionvisiteur.service;

import com.example.gestionvisiteur.model.Journal;
import com.example.gestionvisiteur.model.Utilisateur;
import com.example.gestionvisiteur.repository.JournalRepository;
import com.example.gestionvisiteur.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final JournalRepository journalRepository;

    public UtilisateurService(
            UtilisateurRepository utilisateurRepository,
            JournalRepository journalRepository
    ) {
        this.utilisateurRepository = utilisateurRepository;
        this.journalRepository = journalRepository;
    }

    // ajouter un utilisateur
    public Utilisateur ajouterUtilisateur(Utilisateur utilisateur) {

        Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);

        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);

        Journal log = new Journal(
                "Ajout de l'utilisateur ID: " + savedUtilisateur.getIdUser() + " (" + savedUtilisateur.getEmail() + ")",
                LocalDateTime.now(),
                actor
        );

        journalRepository.save(log);

        return savedUtilisateur;
    }

    // afficher tous les utilisateurs
    @Transactional(readOnly = true)
    public List<Utilisateur> getAllUtilisateurs() {

        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();

        System.out.println("Repository = " + utilisateurs.size());

        return utilisateurs;
    }

    // obtenir un utilisateur par ID
    @Transactional(readOnly = true)
    public Utilisateur getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    // modifier un utilisateur
    @Transactional
    public Utilisateur modifierUtilisateur(Long id, Utilisateur nouvelUtilisateur) {

        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        utilisateur.setNom(nouvelUtilisateur.getNom());
        utilisateur.setPrenom(nouvelUtilisateur.getPrenom());
        utilisateur.setEmail(nouvelUtilisateur.getEmail());
        utilisateur.setIdRole(nouvelUtilisateur.getIdRole());

        if (nouvelUtilisateur.getMotDePass() != null && !nouvelUtilisateur.getMotDePass().trim().isEmpty()) {
            utilisateur.setMotDePass(nouvelUtilisateur.getMotDePass());
        }

        Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);

        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);

        Journal log = new Journal(
                "Modification de l'utilisateur ID: " + savedUtilisateur.getIdUser(),
                LocalDateTime.now(),
                actor
        );

        journalRepository.save(log);

        return savedUtilisateur;
    }

    // supprimer un utilisateur
    @Transactional
    public void supprimerUtilisateur(Long id) {

        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);

        Journal log = new Journal(
                "Suppression de l'utilisateur ID: " + utilisateur.getIdUser() + " (" + utilisateur.getEmail() + ")",
                LocalDateTime.now(),
                actor
        );

        journalRepository.save(log);

        utilisateurRepository.delete(utilisateur);
    }
}