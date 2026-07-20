package com.example.gestionvisiteur.repository;

import com.example.gestionvisiteur.model.Visiteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VisiteurRepository extends JpaRepository<Visiteur, Long> {

}