package com.example.gestionvisiteur.controller;

import com.example.gestionvisiteur.model.Visite;
import com.example.gestionvisiteur.service.VisiteService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/visites")
public class VisiteController {

    private final VisiteService visiteService;

    public VisiteController(VisiteService visiteService) {
        this.visiteService = visiteService;
    }

    @PostMapping
    public Visite ajouterVisite(@RequestBody Visite visite) {
        return visiteService.ajouterVisite(visite);
    }
}