package com.example.gestionvisiteur.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "VISITE")
public class Visite {

    @Id
    @SequenceGenerator(
            name = "visite_seq",
            sequenceName = "visite_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "visite_seq"
    )
    private Long idVisite;

    private String personneVisite;

    private String motif;

    @Column(name = "date_visite")
    private LocalDate dateVisite;

    private LocalTime heureDebut;

    private LocalTime heureFin;

    private String status;


    @ManyToOne
    @JoinColumn(name = "id_visiteur")
    private Visiteur visiteur;



    public Long getIdVisite() {
        return idVisite;
    }

    public void setIdVisite(Long idVisite) {
        this.idVisite = idVisite;
    }

    public String getPersonneVisite() {
        return personneVisite;
    }

    public void setPersonneVisite(String personneVisite) {
        this.personneVisite = personneVisite;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public LocalDate getDateVisite() {
        return dateVisite;
    }

    public void setDateVisite(LocalDate dateVisite) {
        this.dateVisite = dateVisite;
    }

    public LocalTime getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(LocalTime heureDebut) {
        this.heureDebut = heureDebut;
    }

    public LocalTime getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(LocalTime heureFin) {
        this.heureFin = heureFin;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Visiteur getVisiteur() {
        return visiteur;
    }

    public void setVisiteur(Visiteur visiteur) {
        this.visiteur = visiteur;
    }


}