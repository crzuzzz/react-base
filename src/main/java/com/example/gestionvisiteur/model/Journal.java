package com.example.gestionvisiteur.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "JOURNAL")
public class Journal {

    @Id
    @SequenceGenerator(
            name = "journal_seq",
            sequenceName = "journal_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "journal_seq"
    )
    @Column(name = "ID_LOG") // 1. Added explicit column mapping for the Primary Key
    private Long idLog;

    @Column(name = "DATE_ACTION") // 2. Changed to uppercase to match your DB schema
    private LocalDateTime dateAction;

    @Column(name = "ACTION") // 3. Explicitly mapped to uppercase matching your DB
    private String action;

    @ManyToOne
    @JoinColumn(name = "ID_USER") // 4. Changed to uppercase to match your DB schema
    private Utilisateur utilisateur;

    // Default Constructor (Required by JPA/Hibernate)
    public Journal() {}

    // Convenience Constructor for easy logging
    public Journal(String action, LocalDateTime dateAction, Utilisateur utilisateur) {
        this.action = action;
        this.dateAction = dateAction;
        this.utilisateur = utilisateur;
    }



    public Long getIdLog() {
        return idLog;
    }

    public void setIdLog(Long idLog) {
        this.idLog = idLog;
    }

    public LocalDateTime getDateAction() {
        return dateAction;
    }

    public void setDateAction(LocalDateTime dateAction) {
        this.dateAction = dateAction;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}