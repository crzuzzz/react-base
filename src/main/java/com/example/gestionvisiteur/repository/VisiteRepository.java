package com.example.gestionvisiteur.repository;

import com.example.gestionvisiteur.model.Visite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisiteRepository extends JpaRepository<Visite, Long> {

}