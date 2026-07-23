package com.example.gestionvisiteur.controller;

import com.example.gestionvisiteur.dto.LoginRequest;
import com.example.gestionvisiteur.dto.LoginResponse;
import com.example.gestionvisiteur.model.Utilisateur;
import com.example.gestionvisiteur.repository.UtilisateurRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UtilisateurRepository utilisateurRepository;

    public AuthController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Utilisateur> userOpt = utilisateurRepository.findAll().stream()
                .filter(u -> u.getEmail() != null && u.getEmail().equalsIgnoreCase(loginRequest.getEmail()))
                .findFirst();

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou mot de passe incorrect.");
        }

        Utilisateur user = userOpt.get();

        if (!user.getMotDePass().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou mot de passe incorrect.");
        }

        LoginResponse response = new LoginResponse(
                user.getIdUser(),
                user.getNom(),
                user.getPrenom(),
                user.getEmail(),
                user.getIdRole()
        );

        return ResponseEntity.ok(response);
    }
}