import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import "./Recherche.css";

export default function Recherche() {
  const navigate = useNavigate();

  return (
    <div className="recherche">

      <main className="recherche-main">

        <div className="page-header">

          <button
            className="back-button"
            onClick={() => navigate("/accueil")}
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
            <h1>Recherche des Visiteurs</h1>
            <p>
              Recherchez un visiteur par son nom ou son CIN.
            </p>
          </div>


          <div className="search-box">

            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Entrez un nom ou un CIN..."
            />

            <button className="search-button">
              Rechercher
            </button>

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
                  Aucun résultat trouvé.
                </td>
              </tr>

            </tbody>

          </table>


        </div>


      </main>

    </div>
  );
}