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
    private Long idLog;

    @Column(name = "date_action")
    private LocalDateTime dateAction;

    private String action;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private Utilisateur utilisateur;


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