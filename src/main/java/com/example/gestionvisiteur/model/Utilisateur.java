package com.example.gestionvisiteur.model;

import jakarta.persistence.*;

@Entity
@Table(name = "UTILISATEUR")
public class Utilisateur {

    @Id
    @SequenceGenerator(
            name = "utilisateur_seq",
            sequenceName = "utilisateur_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "utilisateur_seq"
    )
    @Column(name = "ID_USER")
    private Long idUser;

    @Column(name = "NOM")
    private String nom;

    @Column(name = "PRENOM")
    private String prenom;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "MOT_DE_PASSE")
    private String motDePass;

    @Column(name = "ID_ROLE")
    private Integer idRole;

    public Utilisateur() {}

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePass() {
        return motDePass;
    }

    public void setMotDePass(String motDePass) {
        this.motDePass = motDePass;
    }

    public Integer getIdRole() {
        return idRole;
    }

    public void setIdRole(Integer idRole) {
        this.idRole = idRole;
    }
}