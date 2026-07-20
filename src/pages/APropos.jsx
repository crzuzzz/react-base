import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiInfo } from "react-icons/fi";
import "./APropos.css";

export default function APropos() {
    const navigate = useNavigate();

    return (
        <div className="a-propos">

            <div className="page-header">
                <button
                    className="back-button"
                    onClick={() => navigate("/accueil")}
                >
                    <FiArrowLeft />
                </button>

                <img
                    className="brand-icon"
                    src="/src/assets/logo.gif"
                    alt="AttijariBank logo"
                />
            </div>


            <div className="about-box">

                <div className="content-block">
          <span className="section-label">
            À propos de l'application
          </span>

                    <h2>
                        Gestion sécurisée des visiteurs pour la banque
                    </h2>

                    <p>
                        Cette application a été développée pour faciliter
                        la gestion des visiteurs au sein d'un établissement
                        bancaire. Elle permet d'assurer un suivi sécurisé
                        des entrées et sorties, d'améliorer l'organisation
                        de l'accueil et de renforcer la sécurité grâce à une
                        gestion centralisée des visiteurs.
                    </p>
                </div>

                <div className="about-icon">
                    <FiInfo />
                </div>

            </div>

        </div>
    );
}