import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./Accueil.css";

export default function Accueil({ onLogout }) {

  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [visites, setVisites] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});


  // charger les visites au chargement de la page
  useEffect(() => {
    fetch("http://localhost:8080/visites")
        .then((response) => response.json())
        .then((data) => {

          const sorties = data.filter((v) => v.heureFin !== null);

          setVisites(sorties);

        })
        .catch((error) => {
          console.log("Erreur récupération visites :", error);
        });

  }, []);



  // effet scroll navbar
  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);




  // animation scroll
  useEffect(() => {

    const observer = new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");
              observer.unobserve(entry.target);

            }

          });

        },
        { threshold: 0.18 }
    );


    document
        .querySelectorAll(".animate-on-scroll")
        .forEach((section) => observer.observe(section));


    return () => observer.disconnect();


  }, []);





  // recherche dynamique
  const rechercher = async (value) => {

    try {

      const response = await fetch("http://localhost:8080/visites");
      const data = await response.json();
      const sorties = data.filter((v) => v.heureFin !== null);


      if (value === "") {

        setVisites(data);

      } else {


        const filtered = data.filter((v) => {


          const nomComplet =
              `${v.visiteur?.nom || ""} ${v.visiteur?.prenom || ""}`
                  .toLowerCase();

          const cin = v.visiteur?.cin?.toLowerCase() || "";

          return (
              nomComplet.startsWith(value) ||
              cin.startsWith(value)
          );


        });



        setVisites(filtered);

      }


    } catch (error) {

      console.log("Erreur recherche :", error);
      setVisites([]);

    }

  };


  const demanderSuppression = (visite) => {
    setSelectedVisit(visite);
    setShowDeletePopup(true);
  };

  const confirmerSuppression = async () => {

    if (!selectedVisit) {
      console.log("Aucune visite sélectionnée");
      return;
    }

    console.log("ID visite :", selectedVisit.idVisite);


    try {

      const response = await fetch(
          `http://localhost:8080/visites/${selectedVisit.idVisite}`,
          {
            method: "DELETE",
          }
      );


      console.log("Response status :", response.status);


      if (response.ok) {

        console.log("Suppression OK");


        setVisites((oldVisites) =>
            oldVisites.filter(
                (v) => v.idVisite !== selectedVisit.idVisite
            )
        );


        setShowDeletePopup(false);
        setSelectedVisit(null);

      }


    } catch (error) {

      console.log("Erreur DELETE :", error);

    }

  };



  const annulerSuppression = () => {

    setShowDeletePopup(false);
    setSelectedVisit(null);

  };
  const commencerModification = (v)=>{

    setEditId(v.idVisite);

    setEditData({

      nom: v.visiteur.nom,
      prenom: v.visiteur.prenom,
      cin: v.visiteur.cin,
      societe: v.visiteur.societe,

      personneVisite: v.personneVisite,
      motif: v.motif,

      dateVisite: v.dateVisite,
      heureDebut: v.heureDebut,
      heureFin: v.heureFin

    });

  };



  const changerValeur = (e) => {

    const {name, value} = e.target;

    setEditData((prev)=>({
      ...prev,
      [name]: value
    }));

  };

  const sauvegarderModification = async(id)=>{

    const data = {

      personneVisite: editData.personneVisite,
      motif: editData.motif,

      dateVisite: editData.dateVisite,
      heureDebut: editData.heureDebut,
      heureFin: editData.heureFin,

      visiteur:{
        nom: editData.nom,
        prenom: editData.prenom,
        cin: editData.cin,
        societe: editData.societe
      }

    };


    try {

      const response = await fetch(
          `http://localhost:8080/visites/${id}`,
          {
            method:"PUT",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
          }
      );


      if(response.ok){

        const updated = await response.json();


        setVisites((prev)=>
            prev.map((v)=>
                v.idVisite === id
                    ? updated
                    : v
            )
        );


        setEditId(null);

      }


    } catch(error){

      console.log("Erreur modification :", error);

    }

  };




  return (

      <div className="accueil">


        <header className={`navbar ${scrolled ? "scrolled" : ""}`}>

          <div className="navbar-inner">


            <a href="#hero" className="brand">

              <img
                  className="brand-icon"
                  src="/src/assets/logo.gif"
                  alt="AttijariBank logo"
              />

            </a>



            <nav className="nav-links">

              <a href="#search">
                Recherche
              </a>


              <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/fonctionnalites");
                  }}
                >
                  Fonctionnalités
              </a>


              <a
                  href="#"
                  onClick={(e) => {

                    e.preventDefault();
                    navigate("/a-propos");

                  }}
              >
                À propos
              </a>


            </nav>




            <div className="nav-actions">

              <button
                  className="button button-primary"
                  onClick={onLogout}
              >
                Déconnexion
              </button>

            </div>


          </div>

        </header>





        <main>


          <section
              className="section search-section animate-on-scroll"
              id="search"
          >


            <div className="section-card">


              <div className="search-box">


                <FiSearch className="search-icon"/>


                <input

                    type="text"

                    placeholder="Rechercher un visiteur par son nom ou son CIN"

                    value={query}


                    onChange={(e)=>{

                      const value =
                          e.target.value.toLowerCase();


                      setQuery(value);

                      rechercher(value);

                    }}

                />


              </div>





              <table className="historique-table">


                <thead>

                <tr>

                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>CIN</th>
                  <th>Société / Organisme</th>
                  <th>Personne à visiter</th>
                  <th>Motif</th>
                  <th>Date</th>
                  <th>Heure entrée</th>
                  <th>Heure sortie</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>

                </tr>


                </thead>





                <tbody>

                {
                  visites.length === 0 ? (

                      <tr>
                        <td colSpan="11" className="empty-table">
                          Aucun résultat trouvé.
                        </td>
                      </tr>

                  ) : (

                      visites.map((v)=>(

                          <tr key={v.idVisite}>


                            <td>
                              {
                                editId === v.idVisite ?

                                    <input
                                        value={editData.nom}
                                        name="nom"
                                        onChange={changerValeur}
                                    />

                                    :

                                    v.visiteur?.nom
                              }
                            </td>



                            <td>
                              {
                                editId === v.idVisite ?

                                    <input
                                        value={editData.prenom}
                                        name="prenom"
                                        onChange={changerValeur}
                                    />

                                    :

                                    v.visiteur?.prenom
                              }
                            </td>



                            <td>
                              {
                                editId === v.idVisite ?

                                    <input
                                        value={editData.cin}
                                        name="cin"
                                        onChange={changerValeur}
                                    />

                                    :

                                    v.visiteur?.cin
                              }
                            </td>



                            <td>
                              {
                                editId === v.idVisite ?

                                    <input
                                        value={editData.societe}
                                        name="societe"
                                        onChange={changerValeur}
                                    />

                                    :

                                    v.visiteur?.societe
                              }
                            </td>



                            <td>
                              {
                                editId === v.idVisite ?

                                    <input
                                        value={editData.personneVisite}
                                        name="personneVisite"
                                        onChange={changerValeur}
                                    />

                                    :

                                    v.personneVisite
                              }
                            </td>



                            <td>
                              {
                                editId === v.idVisite ?

                                    <input
                                        value={editData.motif}
                                        name="motif"
                                        onChange={changerValeur}
                                    />

                                    :

                                    v.motif
                              }
                            </td>



                            <td>
                              {v.dateVisite}
                            </td>


                            <td>
                              {v.heureDebut}
                            </td>


                            <td>
                              {v.heureFin}
                            </td>



                            <td>

                              <button
                                  className="action-btn sortie-btn"

                                  onClick={()=>{

                                    if(editId === v.idVisite){

                                      sauvegarderModification(v.idVisite);

                                    }else{

                                      commencerModification(v);

                                    }

                                  }}

                              >

                                {
                                  editId === v.idVisite
                                      ?
                                      "Sauvegarder"
                                      :
                                      "Modifier"
                                }

                              </button>

                            </td>



                            <td>

                              <button
                                  className="action-btn historique-btn"
                                  onClick={()=>demanderSuppression(v)}
                              >

                                Supprimer

                              </button>

                            </td>


                          </tr>

                      ))

                  )

                }

                </tbody>

              </table>

              {showDeletePopup && (

                  <div className="delete-overlay">

                    <div className="delete-popup">

                      <h3>Confirmation de suppression</h3>

                      <p>
                        Voulez-vous vraiment supprimer ce visiteur ?
                      </p>

                      <div className="delete-actions">

                        <button
                            className="button button-primary"
                            onClick={() => {
                              console.log("CLICK YES");
                              confirmerSuppression();
                            }}
                        >
                          Oui
                        </button>
                        <button
                            className="button button-secondary"
                            onClick={annulerSuppression}
                        >
                          Annuler
                        </button>

                      </div>

                    </div>

                  </div>

              )}

            </div>


          </section>


        </main>



      </div>

  );

}