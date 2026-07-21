import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUserPlus, FiClock } from "react-icons/fi";
import "./Fonctionnalites.css";

// Define the feature list with fallback routes
const featureItems = [
  { Icon: FiUserPlus, title: "Enregistrement Visiteur", route: "/enregistrement" },
  { Icon: FiClock, title: "Entrée / Sortie (Horaire)", route: "/entree-sortie" }
];

export default function Fonctionnalites({ mode = "accueil" }) {
  const navigate = useNavigate();

  const isAdmin = mode === "admin";
  const backRoute = isAdmin ? "/admin" : "/accueil";

  // Determines destination route based on mode
  const getDestinationRoute = (defaultRoute, index) => {
    if (!isAdmin) {
      return defaultRoute; // Goes to /enregistrement or /entree-sortie
    }
    // Admin routes
    const adminRoutes = ["/file1", "/file2"];
    return adminRoutes[index] || `/file${index + 1}`;
  };

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

    document.querySelectorAll(".animate-on-scroll").forEach((section) =>
      observer.observe(section)
    );
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fonctionnalites">
      <main>
        <div className="page-header">
          <button
            className="back-button"
            onClick={() => navigate(backRoute)}
            title={isAdmin ? "Retour à l'admin" : "Retour à l'accueil"}
          >
            <FiArrowLeft />
          </button>

          <a href="#" className="brand" onClick={(e) => { e.preventDefault(); navigate(backRoute); }}>
            <img className="brand-icon" src="/src/assets/logo.gif" alt="AttijariBank logo" />
          </a>
        </div>

        <section className="section features animate-on-scroll" id="features">
          <div className="feature-grid fonc-grid">
            {featureItems.map(({ Icon, title, route }, index) => {
              const targetRoute = getDestinationRoute(route, index);

              return (
                <article
                  key={index}
                  className="feature-card fonc-card-item"
                  onClick={() => navigate(targetRoute)}
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
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}