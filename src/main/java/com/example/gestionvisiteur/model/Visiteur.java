package com.example.gestionvisiteur.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Visiteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVisiteur;

    private String nom;
    private String prenom;
    private String cin;
    private String societe;


    @OneToMany(mappedBy = "visiteur")
    private List<Visite> visites;


    public Long getIdVisiteur() {
        return idVisiteur;
    }

    public void setIdVisiteur(Long idVisiteur) {
        this.idVisiteur = idVisiteur;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getSociete() {
        return societe;
    }

    public void setSociete(String societe) {
        this.societe = societe;
    }
}