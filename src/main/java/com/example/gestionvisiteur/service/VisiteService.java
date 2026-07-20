package com.example.gestionvisiteur.service;

import com.example.gestionvisiteur.model.Visite;
import com.example.gestionvisiteur.model.Visiteur;
import com.example.gestionvisiteur.repository.VisiteRepository;
import com.example.gestionvisiteur.repository.VisiteurRepository;
import com.example.gestionvisiteur.model.Journal;
import com.example.gestionvisiteur.model.Utilisateur;
import com.example.gestionvisiteur.repository.JournalRepository;
import com.example.gestionvisiteur.repository.UtilisateurRepository;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;


@Service
public class VisiteService {

    private final VisiteRepository visiteRepository;
    private JournalRepository journalRepository;
    private UtilisateurRepository utilisateurRepository;
    private final VisiteurRepository visiteurRepository;


    public VisiteService(
            VisiteRepository visiteRepository,
            VisiteurRepository visiteurRepository,
            JournalRepository journalRepository,       //added by med
            UtilisateurRepository utilisateurRepository
    ) {
        this.visiteRepository = visiteRepository;
        this.visiteurRepository = visiteurRepository;
        this.journalRepository = journalRepository;       //added by med
        this.utilisateurRepository = utilisateurRepository; //added by med
    }


    // ajouter une visite
    public Visite ajouterVisite(Visite visite) {

        Visite savedVisite = visiteRepository.save(visite);

        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);

        Journal log = new Journal(
                "Ajout d'une visite ID: " + savedVisite.getIdVisite(),
                LocalDateTime.now(),
                actor
        );

        journalRepository.save(log);

        return savedVisite;
    }


    // afficher toutes les visites
    @Transactional(readOnly = true)
    public List<Visite> getAllVisites() {

        List<Visite> visites = visiteRepository.findAll();

        System.out.println("Repository = " + visites.size());

        return visites;
    }


    // enregistrer sortie
    public Visite enregistrerSortie(Long idVisite) {

        Visite visite = visiteRepository.findById(idVisite)
                .orElseThrow(() -> new RuntimeException("Visite non trouvée"));

        visite.setHeureFin(LocalTime.now());
        visite.setStatus("SORTI");

        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);
        Journal log = new Journal(
                "Sortie enregistrée pour visite ID: " + visite.getIdVisite(),
                LocalDateTime.now(),
                actor
        );
        journalRepository.save(log);

        return visiteRepository.save(visite);
    }


    // supprimer visite + visiteur
    @Transactional
    public void supprimerVisite(Long id) {

        Visite visite = visiteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visite non trouvée"));

        Visiteur visiteur = visite.getVisiteur();

        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);

        Journal log = new Journal(
                "Suppression de la visite ID: " + visite.getIdVisite(),
                LocalDateTime.now(),
                actor
        );

        journalRepository.save(log);

        visiteRepository.delete(visite);

        if (visiteur != null) {
            visiteurRepository.delete(visiteur);
        }
    }
    @Transactional
    public Visite modifierVisite(Long id, Visite nouvelleVisite) {

        Visite visite = visiteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visite non trouvée"));


        visite.setPersonneVisite(nouvelleVisite.getPersonneVisite());
        visite.setMotif(nouvelleVisite.getMotif());
        visite.setDateVisite(nouvelleVisite.getDateVisite());


        // تعديل معلومات الزائر
        if (nouvelleVisite.getVisiteur() != null) {

            visite.getVisiteur().setNom(
                    nouvelleVisite.getVisiteur().getNom()
            );

            visite.getVisiteur().setPrenom(
                    nouvelleVisite.getVisiteur().getPrenom()
            );

            visite.getVisiteur().setCin(
                    nouvelleVisite.getVisiteur().getCin()
            );

            visite.getVisiteur().setSociete(
                    nouvelleVisite.getVisiteur().getSociete()
            );
        }

        Visite savedVisite = visiteRepository.save(visite);


        Utilisateur actor = utilisateurRepository.findById(1L).orElse(null);

        Journal log = new Journal(
                "Modification de la visite ID: " + savedVisite.getIdVisite(),
                LocalDateTime.now(),
                actor
        );

        journalRepository.save(log);


        return savedVisite;
    }

}