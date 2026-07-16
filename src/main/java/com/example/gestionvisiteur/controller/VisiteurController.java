package com.example.gestionvisiteur.controller;

import com.example.gestionvisiteur.model.Visiteur;
import com.example.gestionvisiteur.service.VisiteurService;
import org.springframework.web.bind.annotation.*;
import com.example.gestionvisiteur.dto.EnregistrementRequest;

import java.util.List;

@RestController
@RequestMapping("/visiteurs")
public class VisiteurController {

    private final VisiteurService visiteurService;

    public VisiteurController(VisiteurService visiteurService) {
        this.visiteurService = visiteurService;
    }

    @GetMapping
    public List<Visiteur> getAllVisiteurs() {
        return visiteurService.getAllVisiteurs();
    }

    @PostMapping
    public Visiteur enregistrerVisiteur(@RequestBody EnregistrementRequest request) {
        return visiteurService.enregistrerVisiteur(request);
    }
    @DeleteMapping("/{id}")
    public void supprimerVisiteur(@PathVariable Long id) {
        visiteurService.supprimerVisiteur(id);
    }
    @PutMapping("/{id}")
    public Visiteur modifierVisiteur(@PathVariable Long id, @RequestBody Visiteur visiteur) {
        return visiteurService.modifierVisiteur(id, visiteur);
    }
}