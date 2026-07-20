package com.example.gestionvisiteur.repository;

import com.example.gestionvisiteur.model.Visite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisiteRepository extends JpaRepository<Visite, Long> {

}