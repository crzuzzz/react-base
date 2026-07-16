package com.example.gestionvisiteur.service;

import com.example.gestionvisiteur.model.Visite;
import com.example.gestionvisiteur.repository.VisiteRepository;
import org.springframework.stereotype.Service;

@Service
public class VisiteService {

    private final VisiteRepository visiteRepository;

    public VisiteService(VisiteRepository visiteRepository) {
        this.visiteRepository = visiteRepository;
    }

    public Visite ajouterVisite(Visite visite) {
        return visiteRepository.save(visite);
    }
}