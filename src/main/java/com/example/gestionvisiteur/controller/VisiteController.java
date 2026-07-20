package com.example.gestionvisiteur.controller;

import com.example.gestionvisiteur.model.Visite;
import com.example.gestionvisiteur.service.VisiteService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/visites")
@CrossOrigin("*")
public class VisiteController {

    private final VisiteService visiteService;

    public VisiteController(VisiteService visiteService) {
        this.visiteService = visiteService;
    }

    @PostMapping
    public Visite ajouterVisite(@RequestBody Visite visite) {
        return visiteService.ajouterVisite(visite);
    }

    @GetMapping
    public List<Visite> getAllVisites() {
        return visiteService.getAllVisites();
    }

    @GetMapping("/test")
    public String test() {
        return "OK";
    }

    @PutMapping("/sortie/{id}")
    public Visite enregistrerSortie(@PathVariable Long id) {
        return visiteService.enregistrerSortie(id);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimerVisite(@PathVariable Long id) {

        visiteService.supprimerVisite(id);

        return ResponseEntity.ok("Visite supprimée");
    }
    @PutMapping("/{id}")
    public Visite modifierVisite(
            @PathVariable Long id,
            @RequestBody Visite visite
    ) {
        return visiteService.modifierVisite(id, visite);
    }
}

