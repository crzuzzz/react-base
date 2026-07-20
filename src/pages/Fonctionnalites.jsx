import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiClock, FiArrowLeft } from "react-icons/fi";
import "./Fonctionnalites.css";

const featureItems = [
  {
    Icon: AiOutlineUserAdd,
    title: "Enregistrement",
    description: "Créer rapidement une fiche visiteur.",
    route: "/enregistrement",
  },
  {
    Icon: FiClock,
    title: "Entrée / Sortie",
    description: "Gestion des horaires.",
    route: "/entree-sortie",
  },
];

export default function Fonctionnalites() {
  const navigate = useNavigate();

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

    document.querySelectorAll(".animate-on-scroll").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fonctionnalites">
      <main>
        <div className="page-header">
          <button
            className="back-button"
            onClick={() => navigate("/accueil")}
            title="Retour à l'accueil"
          >
            <FiArrowLeft />
          </button>

          <a href="#" className="brand">
            <img className="brand-icon" src="/src/assets/logo.gif" alt="AttijariBank logo" />
          </a>
        </div>

        <section className="section features animate-on-scroll" id="features">
          <div className="feature-grid fonc-grid">
            {featureItems.map(({ Icon, title, route }, index) => (
                <article
                    key={index}
                    className="feature-card fonc-card-item"
                    onClick={() => navigate(route)}
                    title={title}
                    aria-label={title}
                >
                  <div className="feature-icon fonc-icon">
                    <Icon />
                  </div>

                  <div className="feature-copy fonc-copy">
                    <h3>{title}</h3>
                  </div>
                </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
