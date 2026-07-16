import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Historique.css";

export default function Historique() {
  const navigate = useNavigate();

  return (
    <div className="historique">
      <main className="historique-main">

        <div className="page-header">
          <button
            className="back-button"
            onClick={() => navigate("/")}
            title="Retour à l'accueil"
          >
            <FiArrowLeft />
          </button>

          <a href="#" className="brand">
            <img
              className="brand-icon"
              src="/src/assets/logo.gif"
              alt="AttijariBank logo"
            />
          </a>
        </div>

        <div className="table-container">

          <div className="table-header">
            <h1>Historique des Visiteurs</h1>
            <p>
              Consultez toutes les visites enregistrées.
            </p>
          </div>

          <table className="historique-table">

            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>CIN / Passeport</th>
                <th>Société</th>
                <th>Personne à visiter</th>
                <th>Motif</th>
                <th>Date</th>
                <th>Heure d'entrée</th>
                <th>Heure de sortie</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="9" className="empty-table">
                  Aucun historique disponible.
                </td>
              </tr>

              {/*
              Exemple d'une ligne quand le backend sera prêt :

              <tr>
                <td>Ali</td>
                <td>Ahmed</td>
                <td>12345678</td>
                <td>Attijari Bank</td>
                <td>M. Karim</td>
                <td>Réunion</td>
                <td>13/07/2026</td>
                <td>09:15</td>
                <td>10:30</td>
              </tr>
              */}
            </tbody>

          </table>

        </div>

      </main>
    </div>
  );
}