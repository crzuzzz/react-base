package com.example.gestionvisiteur.service;

import com.example.gestionvisiteur.model.Visite;
import com.example.gestionvisiteur.repository.VisiteRepository;
import org.springframework.stereotype.Service;
import java.time.LocalTime;

import java.util.List;

@Service
public class VisiteService {

    private final VisiteRepository visiteRepository;

    public VisiteService(VisiteRepository visiteRepository) {
        this.visiteRepository = visiteRepository;
    }

    // ajouter une visite
    public Visite ajouterVisite(Visite visite) {
        return visiteRepository.save(visite);
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

        return visiteRepository.save(visite);
    }
}