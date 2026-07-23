package com.example.gestionvisiteur.dto;

public class LoginResponse {
    private Long idUser;
    private String nom;
    private String prenom;
    private String email;
    private Integer idRole;

    public LoginResponse(Long idUser, String nom, String prenom, String email, Integer idRole) {
        this.idUser = idUser;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.idRole = idRole;
    }

    public Long getIdUser() { return idUser; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public String getEmail() { return email; }
    public Integer getIdRole() { return idRole; }
}