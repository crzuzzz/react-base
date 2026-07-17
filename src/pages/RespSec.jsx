import { useEffect, useState } from "react";
import "./RespSec.css";
import TopBar from "./TopBar.jsx";

const statistics = [
    { label: "Présents sur site", value: "12 visiteurs" },
    { label: "Total visites aujourd'hui", value: "45 visites" },
    { label: "Visites en attente", value: "8 planifiées" },
    { label: "Alertes de sécurité", value: "0 anomalie" },
];


const topBarItems = [
    { title: "Espace Responsable Sécurité", route: "" },
    
];

function DisplayTables({ visits }) {
    return (
        <tbody>
            {visits.map((visit) => (
                // Use the database primary key (idVisite) as the React key
                <tr key={visit.idVisite}>
                    {/* Combine Nom and Prénom */}
                    <td>{visit.visiteur.nom} {visit.visiteur.prenom}</td>
                    
                    {/* Access nested visitor fields */}
                    <td>{visit.visiteur.cin}</td>
                    <td>{visit.visiteur.societe}</td>
                    
                    {/* Match backend Visite properties */}
                    <td>{visit.dateVisite}</td>
                    <td>{visit.heureDebut}</td>
                    <td>{visit.heureFin ? visit.heureFin : "-"}</td>
                    <td>{visit.personneVisite}</td>
                    
                    <td>
                        <span className={`resp-sec-status resp-sec-status-${visit.status.toLowerCase().replace(/\s+/g, "-")}`}>
                            {visit.status}
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
export default function RespSec({ onLogout = () => {} }) {

    const [scrolled, setScrolled] = useState(false);

    //visits display data ... *************************************************************************************
    const [visits, setVisits] = useState([]); //where to store the visits data

    useEffect(() => {
    fetch("http://localhost:8080/visites")
        .then((response) => response.json())
        .then((data) => {
            setVisits(data); // Save the database records into state
        })
        .catch((error) => {
            console.error("Erreur de récupération des visites:", error);
        });
}, []);



    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        document.title = "Espace Responsable Sécurité - AttijariBank";
    }, []);

    const handleFilterSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="resp-sec">
            <TopBar items={topBarItems} scrolled={scrolled} onLogout={onLogout} />

            <main className="resp-sec-main">
                
                <section className="resp-sec-section" id="statistiques">
                    <div className="section-card">
                        <div className="resp-sec-section-head">
                            <span className="section-label">Consulter les statistiques</span>
                            <h2>Tableau de bord de sécurité</h2>
                            <p>Les indicateurs clés donnent une lecture rapide de l’activité du jour et des points d’attention.</p>
                        </div>

                        <div className="resp-sec-stats-grid">
                            {statistics.map((stat) => (
                                <article className="resp-sec-stat" key={stat.label}>
                                    <span className="resp-sec-stat-label">{stat.label}</span>
                                    <strong>{stat.value}</strong>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="resp-sec-section" id="recherche">
                    <div className="section-card">
                        <div className="resp-sec-section-head">
                            <span className="section-label">Rechercher des visites par date</span>
                            <h2>Filtrer rapidement les visites</h2>
                            <p>Sélectionnez une date pour consulter uniquement les passages liés à cette journée.</p>
                        </div>

                        <form className="resp-sec-form" onSubmit={handleFilterSubmit}>
                            <label className="resp-sec-field" htmlFor="date-visite">
                                <span>Sélectionner une date</span>
                                <input type="date" id="date-visite" name="date-visite" defaultValue="2026-07-13" />
                            </label>

                            <button className="button button-primary" type="submit">
                                Filtrer
                            </button>
                        </form>
                    </div>
                </section>

                <section className="resp-sec-section" id="liste-visites">
                    <div className="section-card">
                        <div className="resp-sec-section-head">
                            <span className="section-label">Consulter toutes les visites</span>
                            <h2>Historique complet</h2>
                            <p>Un aperçu structuré de toutes les visites enregistrées avec leur statut actuel.</p>
                        </div>

                        <div className="resp-sec-table-wrap">
                            <table className="resp-sec-table">
                                <thead>
                                    <tr>
                                        <th>Nom du visiteur</th>
                                        <th>CIN</th>
                                        <th>Société</th>
                                        <th>Date de visite</th>
                                        <th>Heure début</th>
                                        <th>Heure fin</th>
                                        <th>Employé référent</th>
                                        <th>Statut</th>
                                    </tr>
                                </thead>
                                <DisplayTables visits={visits} />
                            </table>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="resp-sec-footer">
                <p>&copy; 2026 AttijariBank - Système de Gestion des Visiteurs</p>
            </footer>
        </div>
    );
}