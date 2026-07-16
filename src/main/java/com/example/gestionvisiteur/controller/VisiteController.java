package com.example.gestionvisiteur.controller;

import com.example.gestionvisiteur.model.Visite;
import com.example.gestionvisiteur.service.VisiteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/visites")
@CrossOrigin("*")
public class VisiteController {

    private final VisiteService visiteService;

    public VisiteController(VisiteService visiteService) {
        this.visiteService = visiteService;
    }

    // ajouter une visite
    @PostMapping
    public Visite ajouterVisite(@RequestBody Visite visite) {
        return visiteService.ajouterVisite(visite);
    }

    // afficher les visites pour Horaire.jsx
    @GetMapping
    public List<Visite> getAllVisites() {
        return visiteService.getAllVisites();
    }
    @PutMapping("/sortie/{id}")
    public Visite enregistrerSortie(@PathVariable Long id) {
        return visiteService.enregistrerSortie(id);
    }
}

