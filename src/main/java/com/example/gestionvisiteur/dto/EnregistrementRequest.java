package com.example.gestionvisiteur.dto;

public class EnregistrementRequest {

    private String nom;
    private String prenom;
    private String cin;
    private String societe;

    private String visitePour;
    private String motif;

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

    public String getVisitePour() {
        return visitePour;
    }

    public void setVisitePour(String visitePour) {
        this.visitePour = visitePour;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }
}