import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Horaire.css";

export default function Horaire() {

  const navigate = useNavigate();

  const [visites, setVisites] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/visites")
      .then((response) => response.json())
      .then((data) => {
        setVisites(data);
      })
      .catch((error) => {
        console.log("Erreur récupération visites :", error);
      });

  }, []);
  const enregistrerSortie = async (id) => {

  await fetch(`http://localhost:8080/visites/sortie/${id}`, {
    method: "PUT",
  });

  const response = await fetch("http://localhost:8080/visites");
  const data = await response.json();
  setVisites(data);
};


  return (

    <div className="horaire">

      <main className="horaire-main">


        <div className="page-header">

          <button
              className="back-button"
              onClick={() => navigate("/fonctionnalites")}
              title="Retour aux fonctionnalités"
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

            <h1>
              Gestion des Entrées / Sorties
            </h1>

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

              </tr>

            </thead>



            <tbody>


              {visites.length === 0 ? (

                <tr>

                  <td colSpan="9" className="empty-table">

                    Aucun visiteur enregistré pour le moment.

                  </td>

                </tr>


              ) : (


                visites.map((visite) => (

                  <tr key={visite.idVisite}>


                    <td>
                      {visite.visiteur.nom}
                    </td>


                    <td>
                      {visite.visiteur.prenom}
                    </td>


                    <td>
                      {visite.dateVisite}
                    </td>


                    <td>
                      {visite.heureDebut}
                    </td>


                    <td>
                      {visite.heureFin ? visite.heureFin : "-"}
                    </td>


                    <td>
                      {visite.status}
                    </td>


                   <td>
 <button
  className="action-btn sortie-btn"
  onClick={() => enregistrerSortie(visite.idVisite)}
>
  Sortie
</button>
</td>




                  </tr>

                ))

              )}


            </tbody>


          </table>


        </div>


      </main>


    </div>

  );

}