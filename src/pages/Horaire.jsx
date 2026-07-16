import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Horaire.css";

export default function Horaire() {
  const navigate = useNavigate();

  return (
    <div className="horaire">
      <main className="horaire-main">

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
            <h1>Gestion des Entrées / Sorties</h1>
            <p>
              Consultez les visiteurs présents et gérez leurs heures de sortie.
            </p>
          </div>

          <table className="horaire-table">

            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date</th>
                <th>Heure d'entrée</th>
                <th>Heure de sortie</th>
                <th>Statut</th>
                <th>Sortie</th>
                <th>Historique</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td colSpan="8" className="empty-table">
                  Aucun visiteur enregistré pour le moment.
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </main>
    </div>
  );
}