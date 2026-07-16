package com.example.gestionvisiteur.repository;

import com.example.gestionvisiteur.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {


}